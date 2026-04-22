package com.college.taskmanager.dto;

import com.college.taskmanager.model.Priority;
import com.college.taskmanager.model.TaskStatus;
import com.college.taskmanager.model.TaskType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRequestDTO {

    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    @NotNull(message = "Task type is required")
    private TaskType taskType;

    @NotNull(message = "Deadline is required")
    @Future(message = "Deadline must be a future date")
    private LocalDate deadline;

    private Priority priority = Priority.MEDIUM;

    private String remarks;
}
