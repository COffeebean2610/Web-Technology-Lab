// State management
let employees = JSON.parse(localStorage.getItem('employees')) || [];

// DOM Elements
const form = document.getElementById('employee-form');
const editIndex = document.getElementById('edit-index');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const employeeList = document.getElementById('employee-list');
const noDataMessage = document.getElementById('no-data-message');
const searchInput = document.getElementById('search');

// Modal Elements
const viewModal = document.getElementById('view-modal');
const closeBtn = document.querySelector('.close-btn');
const modalDetails = document.getElementById('modal-details');

// Initialize App
function init() {
    renderTable(employees);
}

// Render Table
function renderTable(data) {
    employeeList.innerHTML = '';

    if (data.length === 0) {
        noDataMessage.classList.remove('hidden');
        employeeList.parentElement.classList.add('hidden');
    } else {
        noDataMessage.classList.add('hidden');
        employeeList.parentElement.classList.remove('hidden');

        data.forEach((emp, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${emp.empId}</strong></td>
                <td>
                    <div style="font-weight: 500">${emp.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted)">${emp.email}</div>
                </td>
                <td>${emp.mobile}</td>
                <td><span style="background: rgba(79, 70, 229, 0.1); color: var(--primary); padding: 4px 8px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${emp.department}</span></td>
                <td>$${parseFloat(emp.salary).toLocaleString()}</td>
                <td class="action-btns">
                    <button class="action-btn view-btn" onclick="viewEmployee(${index})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editEmployee(${index})" title="Edit Record">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteEmployee(${index})" title="Delete Record">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            employeeList.appendChild(tr);
        });
    }
}

// Save Employee
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const empData = {
        empId: document.getElementById('empId').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        gender: document.getElementById('gender').value,
        department: document.getElementById('department').value,
        salary: document.getElementById('salary').value,
        address: document.getElementById('address').value
    };

    const index = parseInt(editIndex.value);

    if (index === -1) {
        // Create
        employees.push(empData);
    } else {
        // Update
        employees[index] = empData;

        // Reset Form State after update
        resetFormState();
    }

    saveData();
    renderTable(employees);
    form.reset();
});

// View Employee Details
window.viewEmployee = function (index) {
    const emp = employees[index];

    modalDetails.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">Employee ID</span>
            <span class="detail-value">${emp.empId}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Full Name</span>
            <span class="detail-value">${emp.name}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Email Address</span>
            <span class="detail-value">${emp.email}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Mobile Number</span>
            <span class="detail-value">${emp.mobile}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Gender</span>
            <span class="detail-value">${emp.gender}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Department</span>
            <span class="detail-value">${emp.department}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Salary</span>
            <span class="detail-value">$${parseFloat(emp.salary).toLocaleString()}</span>
        </div>
        <div class="detail-item" style="grid-column: 1 / -1">
            <span class="detail-label">Address</span>
            <span class="detail-value">${emp.address}</span>
        </div>
    `;

    viewModal.style.display = 'flex';
}

// Edit Employee
window.editEmployee = function (index) {
    const emp = employees[index];

    document.getElementById('empId').value = emp.empId;
    document.getElementById('name').value = emp.name;
    document.getElementById('email').value = emp.email;
    document.getElementById('mobile').value = emp.mobile;
    document.getElementById('gender').value = emp.gender;
    document.getElementById('department').value = emp.department;
    document.getElementById('salary').value = emp.salary;
    document.getElementById('address').value = emp.address;

    editIndex.value = index;
    formTitle.textContent = 'Update Employee';
    submitBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Update Employee';

    // Smooth scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// Delete Employee
window.deleteEmployee = function (index) {
    if (confirm('Are you sure you want to delete this employee record?')) {
        employees.splice(index, 1);
        saveData();
        renderTable(employees);

        // If we were editing this deleted employee, reset the form
        if (parseInt(editIndex.value) === index) {
            form.reset();
            resetFormState();
        } else if (parseInt(editIndex.value) > index) {
            // Adjust edit index if a row before the currently edited one was deleted
            editIndex.value = parseInt(editIndex.value) - 1;
        }
    }
}

// Reset Form State
function resetFormState() {
    editIndex.value = '-1';
    formTitle.textContent = 'Add New Employee';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Employee';
}

// Reset Button Handler
resetBtn.addEventListener('click', () => {
    form.reset();
    resetFormState();
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();

    const filtered = employees.filter(emp => {
        return emp.name.toLowerCase().includes(term) ||
            emp.empId.toLowerCase().includes(term) ||
            emp.department.toLowerCase().includes(term) ||
            emp.email.toLowerCase().includes(term);
    });

    renderTable(filtered);
});

// Save to LocalStorage
function saveData() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Modal Close Handlers
closeBtn.addEventListener('click', () => {
    viewModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === viewModal) {
        viewModal.style.display = 'none';
    }
});

// Start the app
init();
