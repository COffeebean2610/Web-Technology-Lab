<?php


$servername = "localhost";
$username   = "root";
$password   = "root";
$database   = "ebookshop_db";

$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}
?>