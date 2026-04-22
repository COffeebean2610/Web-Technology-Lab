package com.college.taskmanager.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String department;
    private String designation;
    private String phoneNumber;
    private int taskCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
