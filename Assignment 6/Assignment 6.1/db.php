<?php
$host = 'localhost';
$dbname = 'employee_db';
// The default user in XAMPP is 'root' with no password.
$user = 'root';
$pass = ''; 

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
