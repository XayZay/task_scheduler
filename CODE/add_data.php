<?php
session_start();
header('Content-Type: application/json');

// Credentials
$host = "localhost";
$user = "root";
$pass = "";
$db = "bat_file_dashboard";

// Connect to the database
$conn = new mysqli($host, $user, $pass, $db);

// Connection logic
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $task_name = trim($_POST['task_name'] ?? '');
    $file_path = trim($_POST['file_path'] ?? '');
    $is_enabled = (isset($_POST['is_enabled']) && $_POST['is_enabled'] == '1') ? 1 : 0;
    $interval_minutes = intval($_POST['interval_minutes'] ?? 0);
    $description = trim($_POST['description'] ?? '');
    
    // if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //     $task_name = $_POST['task_name'];
    //     $file_path = $_POST['file_path'];
    //     $is_enabled = $_POST['is_enabled'];
    //     $interval_minutes = $_POST['interval_minutes'];
    //     $description = $_POST['description'];

    
    if (empty($task_name) || empty($description) || $interval_minutes <= 0) {
        echo json_encode(['error' => 'Task name, description and a valid interval to run at are required.']);
        exit;
    }

    //$sql = "INSERT INTO tasks (task_name, file_path, is_enabled, interval_minutes, description) VALUES ('$task_name', '$file_path', $is_enabled, $interval_minutes,'$description')";

    $stmt = $conn->prepare("INSERT INTO tasks (task_name, file_path, is_enabled, interval_minutes, description) VALUES (?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        echo json_encode(['error' => 'Prepare failed: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("ssiis", $task_name, $file_path, $is_enabled, $interval_minutes, $description);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Task added successfully']);
    } else {
        echo json_encode(['error' => 'Execution failed: ' . $stmt->error]);
    }
    $stmt->close();
}

//     if ($conn->query($sql) === TRUE) {

//         echo json_encode(['success' => 'Task added successfully']);
//     } else {
//         echo json_encode(['error' => 'Error: ' . $conn->error]);
//     }
// }

$conn->close();
?>