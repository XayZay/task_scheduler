<?php
session_start();
header('Content-Type: application/json');

//credentials
$host = "localhost";
$user = "root";
$pass = "";
$db = "bat_file_dashboard";

//connect to db
$conn = new mysqli($host,$user,$pass,$db);  

//connection logic
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database Connection failed']);
    exit;
}

//fetch data from db
$sql = "SELECT * from tasks";
$result = $conn->query($sql);

//loop to put all data in an array
$data = [];
while ($row = $result -> fetch_assoc()){
    $data[] = $row;
}

//send data and close connection
echo json_encode($data);
$conn->close();
?>