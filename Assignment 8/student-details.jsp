<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student Information Portal</title>
    <style>
        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            margin: 30px;
            background: #f4f7fb;
            color: #1f2937;
        }
        h1 {
            margin-bottom: 16px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        th, td {
            padding: 12px;
            border: 1px solid #d1d5db;
            text-align: left;
        }
        th {
            background: #1e3a8a;
            color: white;
        }
        tr:nth-child(even) {
            background: #f9fafb;
        }
        .error {
            color: #b91c1c;
            font-weight: 600;
            margin-top: 12px;
        }
        .note {
            margin-bottom: 14px;
            color: #4b5563;
        }
    </style>
</head>
<body>
    <h1>Student Information</h1>
    <p class="note">Records fetched from table <strong>students_info</strong> using JSP and JDBC.</p>

    <%
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        String jdbcUrl = "jdbc:mysql://localhost:3306/college_portal";
        String dbUser = "root";
        String dbPassword = "abhishelke123";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(jdbcUrl, dbUser, dbPassword);
            ps = con.prepareStatement("SELECT stud_id, stud_name, class, division, city FROM students_info ORDER BY stud_id");
            rs = ps.executeQuery();
    %>

    <table>
        <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Division</th>
            <th>City</th>
        </tr>

        <%
            while (rs.next()) {
        %>
        <tr>
            <td><%= rs.getInt("stud_id") %></td>
            <td><%= rs.getString("stud_name") %></td>
            <td><%= rs.getString("class") %></td>
            <td><%= rs.getString("division") %></td>
            <td><%= rs.getString("city") %></td>
        </tr>
        <%
            }
        %>
    </table>

    <%
        } catch (Exception e) {
    %>
        <p class="error">Database error: <%= e.getMessage() %></p>
    <%
        } finally {
            if (rs != null) {
                try { rs.close(); } catch (SQLException ignored) {}
            }
            if (ps != null) {
                try { ps.close(); } catch (SQLException ignored) {}
            }
            if (con != null) {
                try { con.close(); } catch (SQLException ignored) {}
            }
        }
    %>
</body>
</html>
