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

    if ($id <= 0) {
        echo json_encode(['error' => 'Invalid task ID']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
    if (!$stmt) {
        echo json_encode(['error' => 'Prepare failed: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => 'Task deleted successfully']);
        } else {
            echo json_encode(['error' => 'Task not found or already deleted']);
        }
    } else {
        echo json_encode(['error' => 'Execution failed: ' . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
