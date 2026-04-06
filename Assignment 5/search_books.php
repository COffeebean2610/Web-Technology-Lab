<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");


include 'db_connect.php';


$searchTerm = isset($_GET['search']) ? trim($_GET['search']) : "";

if ($searchTerm !== "") {
    $like = $searchTerm . "%";
    $stmt = $conn->prepare("SELECT * FROM ebookshop WHERE book_title LIKE ? OR book_author LIKE ? ORDER BY book_id");
    $stmt->bind_param("ss", $like, $like);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT * FROM ebookshop ORDER BY book_id");
}

$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode(["status" => "success", "data" => $books, "count" => count($books)]);

$conn->close();
?>