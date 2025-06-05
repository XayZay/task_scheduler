<?php
session_start();
header('Content-Type: application/json');

// DB credentials
$host = "localhost";
$user = "root";
$pass = "";
$db = "bat_file_dashboard";

// Connect
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);
    $task_name = trim($_POST['task_name'] ?? '');
    $file_path = trim($_POST['file_path'] ?? '');
    $is_enabled = (isset($_POST['is_enabled']) && $_POST['is_enabled'] == '1') ? 1 : 0;
    $interval_minutes = intval($_POST['interval_minutes'] ?? 0);
    $description = trim($_POST['description'] ?? '');

    if ($id <= 0 || empty($task_name) || empty($description) || $interval_minutes <= 0) {
        echo json_encode(['error' => 'Invalid input. ID, task name, interval, and description are required.']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE tasks SET task_name = ?, file_path = ?, is_enabled = ?, interval_minutes = ?, description = ? WHERE id = ?");
    if (!$stmt) {
        echo json_encode(['error' => 'Prepare failed: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("ssiisi", $task_name, $file_path, $is_enabled, $interval_minutes, $description, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Task updated successfully']);
    } else {
        echo json_encode(['error' => 'Execution failed: ' . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
