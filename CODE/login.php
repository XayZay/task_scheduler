<?php
session_start();
require "db_connect.php";

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT user_id, username FROM login_id WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0){
    $stmt->bind_result($user_id,$username);
    $stmt->fetch();

    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $username;

    header("location: dashboard.html");
    exit();
}
else{
    echo "Invalid Username or Password!";
}

$stmt->close();
$conn->close();

?>