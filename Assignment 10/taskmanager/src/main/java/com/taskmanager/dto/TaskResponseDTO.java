package com.college.taskmanager.dto;

import com.college.taskmanager.model.Priority;
import com.college.taskmanager.model.TaskStatus;
import com.college.taskmanager.model.TaskType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDTO {

    private Long id;
    private String title;
    private String description;
    private TaskType taskType;
    private TaskStatus status;
    private Priority priority;
    private LocalDate deadline;
    private String remarks;
    private List<String> assignedEmployeeNames;
    private int assignedCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
