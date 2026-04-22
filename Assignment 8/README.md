# JSP Student Information Portal

This assignment demonstrates JSP + JDBC by fetching student records from a database table and displaying them on a web page.

## Files
- `students_setup.sql`: creates `college_portal` database, `students_info` table, and sample rows.
- `student-details.jsp`: executes `SELECT` query and renders table data.

## Prerequisites
- JDK 8+  
- Apache Tomcat 9/10  
- MySQL Server  
- MySQL JDBC driver (`mysql-connector-j` JAR)

## Setup Steps
1. Create schema and table:
   - Open MySQL client and run `students_setup.sql`.
2. Configure DB credentials in `student-details.jsp`:
   - `jdbcUrl`, `dbUser`, `dbPassword`
3. Add MySQL driver JAR to Tomcat:
   - Copy `mysql-connector-j-<version>.jar` to Tomcat `lib` folder (or app `WEB-INF/lib`).
4. Deploy JSP:
   - Place `student-details.jsp` inside your web app folder in Tomcat.
5. Start Tomcat and open:
   - `http://localhost:8080/<your-app-name>/student-details.jsp`

## SQL Query Used
```sql
SELECT stud_id, stud_name, class, division, city
FROM students_info
ORDER BY stud_id;
```

## Notes
- If your MySQL password is blank, set `dbPassword` to an empty string.
- If DB connection fails, the error message is shown on the JSP page.
