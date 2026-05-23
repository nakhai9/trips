package com.server.api.plans.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlanRequestDto {
    @NotBlank(message = "Title is required")
    private String title;
    private String description;
    private Boolean isPublic;
    private String accessCode;
    private UUID userId;
    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;
    @NotNull(message = "End date is required")
    private LocalDateTime  endDate;
}
