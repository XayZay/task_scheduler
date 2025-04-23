<?php
//credentials
$host = "localhost";
$user = "root";
$pass = "";
$db = "bat_file_dashboard";

//connect to db
$conn = new mysqli($host,$user,$pass,$db);  

//connection logic
if ($conn->connect_error) {
    die("Connection failed: ".conn->connect_error);
}
//echo "Connected Successfully";
?>