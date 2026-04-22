package com.college.taskmanager.repository;

import com.college.taskmanager.model.Priority;
import com.college.taskmanager.model.Task;
import com.college.taskmanager.model.TaskStatus;
import com.college.taskmanager.model.TaskType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByTaskType(TaskType taskType);

    List<Task> findByPriority(Priority priority);

    List<Task> findByDeadlineBefore(LocalDate date);

    List<Task> findByDeadlineBetween(LocalDate start, LocalDate end);

    @Query("SELECT t FROM Task t WHERE t.deadline < CURRENT_DATE AND t.status <> 'COMPLETED'")
    List<Task> findOverdueTasks();

    @Query("SELECT t FROM Task t JOIN t.assignedEmployees e WHERE e.id = :employeeId")
    List<Task> findTasksByEmployeeId(Long employeeId);

    @Query("SELECT t FROM Task t WHERE t.status = 'PENDING' OR t.status = 'IN_PROGRESS' ORDER BY t.deadline ASC")
    List<Task> findActiveTasks();
}
