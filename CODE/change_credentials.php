<?php
session_start();
header('Content-Type: application/json');

// DB credentials
$host = "localhost";
$user = "root";
$pass = "";
$db = "bat_file_dashboard";

// Connect to DB
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}

$current_user = $_SESSION['username'] ?? null;

if (!$current_user) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_username = trim($_POST['new_username'] ?? '');
    $new_password = trim($_POST['new_password'] ?? '');

    if (empty($new_username) && empty($new_password)) {
        echo json_encode(['error' => 'Provide either a new username or password']);
        exit;
    }

    if (!empty($new_username) && !empty($new_password)) {
        $stmt = $conn->prepare("UPDATE login_id SET username = ?, password = ? WHERE username = ?");
        $stmt->bind_param("sss", $new_username, $new_password, $current_user);
    } elseif (!empty($new_username)) {
        $stmt = $conn->prepare("UPDATE login_id SET username = ? WHERE username = ?");
        $stmt->bind_param("ss", $new_username, $current_user);
    } else {
        $stmt = $conn->prepare("UPDATE login_id SET password = ? WHERE username = ?");
        $stmt->bind_param("ss", $new_password, $current_user);
    }

    if (!$stmt) {
        echo json_encode(['error' => 'Prepare failed: ' . $conn->error]);
        exit;
    }

    if ($stmt->execute()) {
        if (!empty($new_username)) {
            $_SESSION['username'] = $new_username;
        }
        echo json_encode(['success' => 'Credentials updated']);
    } else {
        echo json_encode(['error' => 'Credentials update failed: ' . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
