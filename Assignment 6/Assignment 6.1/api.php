<?php
header('Content-Type: application/json');
require 'db.php';

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');

switch ($action) {
    case 'read':
        $sql = "SELECT * FROM employees ORDER BY id DESC";
        $result = $conn->query($sql);
        $employees = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $employees[] = $row;
            }
        }
        echo json_encode($employees);
        break;

    case 'create':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) $data = $_POST;

        $empId = $conn->real_escape_string($data['empId']);
        $name = $conn->real_escape_string($data['name']);
        $email = $conn->real_escape_string($data['email']);
        $mobile = $conn->real_escape_string($data['mobile']);
        $gender = $conn->real_escape_string($data['gender']);
        $department = $conn->real_escape_string($data['department']);
        $salary = $conn->real_escape_string($data['salary']);
        $address = $conn->real_escape_string($data['address']);
        
        $check = $conn->query("SELECT * FROM employees WHERE empId='$empId'");
        if ($check && $check->num_rows > 0) {
            echo json_encode(["status" => "error", "message" => "An employee with this ID already exists."]);
            exit;
        }

        $sql = "INSERT INTO employees (empId, name, email, mobile, gender, department, salary, address)
                VALUES ('$empId', '$name', '$email', '$mobile', '$gender', '$department', '$salary', '$address')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Employee Added Successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
        break;

    case 'update':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) $data = $_POST;

        $empId = $conn->real_escape_string($data['empId']);
        $mobile = $conn->real_escape_string($data['mobile']);
        $gender = $conn->real_escape_string($data['gender']);
        $department = $conn->real_escape_string($data['department']);
        $salary = $conn->real_escape_string($data['salary']);
        $address = $conn->real_escape_string($data['address']);

        // Only update modifiable fields (ID, Name, Email are read-only)
        $sql = "UPDATE employees SET 
                mobile='$mobile', gender='$gender', department='$department', 
                salary='$salary', address='$address' 
                WHERE empId='$empId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Employee Updated Successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
        break;

    case 'delete':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(["status" => "error", "message" => "Invalid data"]);
            exit;
        }

        $empId = $conn->real_escape_string($data['empId']);

        $sql = "DELETE FROM employees WHERE empId='$empId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Employee Deleted!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error deleting record: " . $conn->error]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid action."]);
}

$conn->close();
?>
