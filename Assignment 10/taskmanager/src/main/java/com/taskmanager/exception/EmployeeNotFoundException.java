package com.college.taskmanager.exception;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(Long id) {
        super("Employee not found with ID: " + id);
    }
    public EmployeeNotFoundException(String email) {
        super("Employee not found with email: " + email);
    }
}
