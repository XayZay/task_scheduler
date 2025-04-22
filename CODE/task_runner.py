import time
import os
import subprocess
from datetime import datetime, timedelta
from db_connect import get_connection

interval_seconds = 10

def fetch_tasks():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks where is_enabled = 1")
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()
    return tasks

def update_task_run_details(task_id, last_output, next_run):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
                   UPDATE tasks
                   SET last_run = NOW(), last_output = %s, next_run = %s, updated_at = NOW()
                   WHERE id = %s
                   """,(last_output, next_run, task_id))
    conn.commit()
    cursor.close()
    conn.close()
    
def task_to_run(task):
    now = datetime.now()
    if not task["next_run"]:
        return True
    try:
        next_run = task["next_run"]
        return now >= next_run
    except Exception:
        return True
    
#chatgpt code
def get_next_run(task):
    now = datetime.now()
    if task["type"] == "interval" and task["interval_minutes"]:
        return now + timedelta(minutes=task["interval_minutes"])
    elif task["type"] == "daily":
        tomorrow = now + timedelta(days=1)
        return tomorrow.replace(hour=9, minute=0, second=0, microsecond=0)
    else:
        return now + timedelta(minutes=5)
    
def run_task(task):
    file_path = task["file_path"]
    if not os.path.exists(file_path):
        return f"File not found: {file_path}"
    
    try:
        result = subprocess.run(file_path, capture_output=True, text=True, shell=True,check=True,timeout=30)
        return result.stdout + result.stderr
    except subprocess.TimeoutExpired:
        output = "Error: Task timed out."
    except subprocess.CalledProcessError as e:
        output = f"Error: {e}"
    except Exception as e:
        output = f"Unexpected error: {str(e)}"

def main():
    print("Task_Scheduler started")
    while True:
        tasks = fetch_tasks()
        for task in tasks:
            if task_to_run(task):
                print(f"Running task: {task["task_name"]}")
                output = run_task(task)
                next_run = get_next_run(task)
                update_task_run_details(task["id"], output, next_run)
        time.sleep(interval_seconds)
if __name__=="__main__":
    main()
                