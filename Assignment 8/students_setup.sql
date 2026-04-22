-- Create database (optional, if not already present)
CREATE DATABASE IF NOT EXISTS college_portal;
USE college_portal;

-- Create students_info table
CREATE TABLE IF NOT EXISTS students_info (
    stud_id INT PRIMARY KEY,
    stud_name VARCHAR(100) NOT NULL,
    class VARCHAR(30) NOT NULL,
    division VARCHAR(10) NOT NULL,
    city VARCHAR(60) NOT NULL
);

-- Sample data
INSERT INTO students_info (stud_id, stud_name, class, division, city) VALUES
(101, 'Aarav Patil', 'TY', 'A', 'Pune'),
(102, 'Neha Kulkarni', 'TY', 'B', 'Mumbai'),
(103, 'Rohan Deshmukh', 'TY', 'A', 'Nashik'),
(104, 'Isha Joshi', 'TY', 'C', 'Nagpur'),
(105, 'Siddhant More', 'TY', 'B', 'Kolhapur')
ON DUPLICATE KEY UPDATE
stud_name = VALUES(stud_name),
class = VALUES(class),
division = VALUES(division),
city = VALUES(city);
