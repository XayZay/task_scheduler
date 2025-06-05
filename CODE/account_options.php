<?php
session_start();
header('Content-Type: application/json');

// DB Credentials
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

// logout
if (isset($_POST['action']) && $_POST['action'] === 'logout') {
    session_destroy();
    echo json_encode(['success' => 'User Logged out successfully']);
    exit;
}

// delete account
if (isset($_POST['action']) && $_POST['action'] === 'delete') {
    $stmt = $conn->prepare("DELETE FROM login_id WHERE username = ?");
    $stmt->bind_param("s", $current_user);

    if ($stmt->execute()) {
        session_destroy();
        echo json_encode(['success' => 'User deleted and logged out']);
    } else {
        echo json_encode(['error' => 'Account deletion failed: ' . $stmt->error]);
    }

    $stmt->close();
    exit;
}

echo json_encode(['error' => 'Invalid action']);
$conn->close();
?>
