<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management System - Assignment 7</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container" id="mainContainer">
        <h1>Employee Management System</h1>

        <!-- Registration Form (Hidden by default) -->
        <div class="form-container" id="registrationSection" style="display: none;">
            <h2 id="formTitle">Employee Registration Form</h2>
            <form id="employeeForm">
                <div class="input-group">
                    <label for="empId">Employee ID:</label>
                    <input type="text" id="empId" placeholder="Enter Employee ID" required>
                </div>
                <div class="input-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" placeholder="Enter Name" required>
                </div>
                <div class="input-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter Email" required>
                </div>
                <div class="input-group">
                    <label for="mobile">Mobile No:</label>
                    <input type="text" id="mobile" placeholder="Enter Mobile No" required>
                </div>
                <div class="input-group">
                    <label for="gender">Gender:</label>
                    <select id="gender" required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="department">Department:</label>
                    <input type="text" id="department" placeholder="Enter Department" required>
                </div>
                <div class="input-group">
                    <label for="salary">Salary:</label>
                    <input type="number" id="salary" placeholder="Enter Salary" required>
                </div>
                <div class="input-group">
                    <label for="address">Address:</label>
                    <textarea id="address" placeholder="Enter Address" required></textarea>
                </div>

                <div class="button-group">
                    <button type="button" id="btnSave" class="btn btn-add" onclick="saveNewEmployee()">Save Information</button>
                    <button type="button" id="btnUpdateSave" class="btn btn-update" onclick="saveUpdateEmployee()" style="display:none;">Update Information</button>
                    <button type="button" class="btn btn-clear" onclick="hideForm()">Cancel</button>
                </div>
            </form>
        </div>

        <!-- Output / View Section -->
        <div id="outputArea" class="output-container" style="display: none;">
            <h2>Employee Record</h2>
            <div id="employeeDetails"></div>
            <button class="btn btn-close" onclick="closeView()">Close View</button>
        </div>
        
        <!-- Main Actions Menu (Moved below content) -->
        <div class="actions-menu button-group" style="margin-top: 20px;">
            <button type="button" class="btn btn-add" onclick="showAddForm()">Add</button>
            <button type="button" class="btn btn-update" onclick="promptUpdate()">Update</button>
            <button type="button" class="btn btn-delete" onclick="promptDelete()">Delete</button>
            <button type="button" class="btn btn-view" onclick="viewEmployee()">View</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
