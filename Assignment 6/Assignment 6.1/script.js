let employees = []; // Stores the latest fetched employees for local lookups

// Helper to get form data
function getFormData() {
    return {
        empId: document.getElementById('empId').value.trim(),
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        mobile: document.getElementById('mobile').value.trim(),
        gender: document.getElementById('gender').value,
        department: document.getElementById('department').value.trim(),
        salary: document.getElementById('salary').value.trim(),
        address: document.getElementById('address').value.trim()
    };
}

// UI Controls
function hideForm() {
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('employeeForm').reset();
    document.getElementById('empId').readOnly = false;
    document.getElementById('name').readOnly = false;
    document.getElementById('email').readOnly = false;
}

function showAddForm() {
    closeView();
    document.getElementById('registrationSection').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Add New Employee';

    // Show Save, hide Update
    document.getElementById('btnSave').style.display = 'inline-block';
    document.getElementById('btnUpdateSave').style.display = 'none';

    document.getElementById('employeeForm').reset();
    document.getElementById('empId').readOnly = false;
    document.getElementById('name').readOnly = false;
    document.getElementById('email').readOnly = false;
}

function promptUpdate() {
    hideForm();
    viewEmployee('update');
}

function promptDelete() {
    hideForm();
    viewEmployee('delete');
}

// 1. ADD / SAVE NEW Function
function saveNewEmployee() {
    const data = getFormData();

    if (!data.empId || !data.name || !data.email) {
        alert("Please fill in at least the Employee ID, Name, and Email.");
        return;
    }

    fetch('api.php?action=create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            alert(result.message);
            hideForm();
        } else {
            alert(result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred trying to connect to the server.');
    });
}

// 2. UPDATE SAVE Function
function saveUpdateEmployee() {
    const data = getFormData();

    if (!data.empId) {
        alert("Error: Employee ID is missing.");
        return;
    }

    fetch('api.php?action=update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            alert(result.message);
            hideForm();
        } else {
            alert(result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred trying to connect to the server.');
    });
}

// 3. DELETE Button Function (from within View list)
function deleteEmployeeById(empId) {
    if (confirm("Are you sure you want to delete this employee?")) {
        fetch('api.php?action=delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empId: empId })
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                alert(result.message);
                // Refresh view
                viewEmployee('delete');
            } else {
                alert(result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred trying to connect to the server.');
        });
    }
}

// LOAD Data into form for Edit
function loadEmployeeForUpdate(empId) {
    const emp = employees.find(e => e.empId === empId);
    if (!emp) return;

    closeView();

    // Show form
    document.getElementById('registrationSection').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Update Employee';

    // Hide Save, show Update Save
    document.getElementById('btnSave').style.display = 'none';
    document.getElementById('btnUpdateSave').style.display = 'inline-block';

    // Populate
    document.getElementById('empId').value = emp.empId;
    document.getElementById('empId').readOnly = true; // Prevent changing ID
    document.getElementById('name').value = emp.name;
    document.getElementById('name').readOnly = true; // Prevent changing Name
    document.getElementById('email').value = emp.email;
    document.getElementById('email').readOnly = true; // Prevent changing Email
    document.getElementById('mobile').value = emp.mobile;
    document.getElementById('gender').value = emp.gender;
    document.getElementById('department').value = emp.department;
    document.getElementById('salary').value = emp.salary;
    document.getElementById('address').value = emp.address;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. VIEW Button Function
function viewEmployee(mode = 'view') {
    hideForm();

    fetch('api.php?action=read')
    .then(response => response.json())
    .then(data => {
        employees = data; // Update local array for future loads
        
        if (employees.length === 0) {
            alert("No employees found. Please Add one first.");
            closeView();
            return;
        }

        let detailsHtml = "";
        employees.forEach((emp) => {
            detailsHtml += `
            <div style="border-bottom: 1px solid #ccc; padding-bottom: 15px; margin-bottom: 15px;">
                <div class="detail-row"><span class="detail-label">Employee ID:</span> ${emp.empId}</div>
                <div class="detail-row"><span class="detail-label">Name:</span> ${emp.name}</div>
                <div class="detail-row"><span class="detail-label">Email:</span> ${emp.email}</div>
                <div class="detail-row"><span class="detail-label">Mobile:</span> ${emp.mobile}</div>
                <div class="detail-row"><span class="detail-label">Gender:</span> ${emp.gender}</div>
                <div class="detail-row"><span class="detail-label">Department:</span> ${emp.department}</div>
                <div class="detail-row"><span class="detail-label">Salary:</span> $${emp.salary}</div>
                <div class="detail-row"><span class="detail-label">Address:</span> ${emp.address}</div>
                <div style="margin-top: 10px;">
            `;

            if (mode === 'update') {
                detailsHtml += `<button type="button" class="btn btn-update" onclick="loadEmployeeForUpdate('${emp.empId}')">Update</button>`;
            } else if (mode === 'delete') {
                detailsHtml += `<button type="button" class="btn btn-delete" onclick="deleteEmployeeById('${emp.empId}')">Delete</button>`;
            }

            detailsHtml += `
                    </div>
                </div>
            `;
        });

        document.getElementById('employeeDetails').innerHTML = detailsHtml;
        document.getElementById('outputArea').style.display = 'block';
    })
    .catch(error => {
        console.error('Error fetching employees:', error);
        alert('Could not fetch employees from server.');
    });
}

function closeView() {
    document.getElementById('outputArea').style.display = 'none';
    document.getElementById('employeeDetails').innerHTML = '';
}
