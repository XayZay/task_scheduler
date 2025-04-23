# task_scheduler
# 🖥️ BAT File Scheduler Dashboard

A lightweight web-based task scheduler built with PHP and Python, designed to run and monitor `.bat` files on a Windows system. Intended as a simple alternative to Windows Task Scheduler, this tool allows you to set execution intervals, log outputs, and trigger tasks manually from a web interface.

---

## 📂 Features

- 📁 Scan a folder for `.bat` files
- ✅ Run `.bat` files on intervals (e.g. every 5 minutes) or at specific daily times  
- 📊 Log task outputs and execution times  
- 💻 PHP-based web dashboard to:  
  - Add, edit, and enable/disable tasks  
  - View task logs  
  - Manually trigger `.bat` files  
- 🔁 Python background script that:  
  - Reads task configurations from MySQL  
  - Executes `.bat` files at scheduled times  
  - Logs results to the database  
- 🧠 Memory-efficient infinite loop so it runs forever

---

## 🛠 Technologies Used

- PHP (web frontend & MySQL connection)  
- MySQL (task database)  
- Python (scheduler backend)  
- HTML/CSS (basic UI)  
- `.bat` files (target scripts)  

---

## 🔧 How to Test

1. ✅ **Clone** the repo and open with a local server (XAMPP/WAMP)
2. ✅ Create a **MySQL database** and import the `tasks` and `Login_id` tables
3. ✅ Configure your DB credentials in:
   - `db_connect.py` (for Python)
   - `db_connect.php` (for PHP)
4. ✅ Add `.bat` files to your chosen folder
5. ✅ Run `task_runner.py` to start the task runner
6. ✅ Open `index.html` in your browser

---

## 🌐 Access the Web Interface

Use **localhost** (via **XAMPP**, **WAMP**, etc.) to:

- 🔐 **Login**
- ⚙️ **Manage tasks**
- 🚀 **Trigger tasks manually**

---

## 🔐 Authentication

- 🔑 Simple PHP login system *(no hashing yet)*
- 🛡️ Sessions are used to keep users logged in

---

## 🧠 Notes

- 🪶 Designed to be **very lightweight** and **memory-friendly**
- 🧰 Useful for **IT Admins** managing local scripts
- 🔄 Easy to extend with new trigger types *(e.g. weekly)*
