package com.server.api.plans.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.plans.PlanService;
import com.server.api.plans.dto.CreatePlanResponseDto;
import com.server.api.plans.dto.PlanRequestDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
@Tag(name = "Plans", description = "")
public class CreatePlanController {
    private final PlanService planService;

    @PostMapping()
    public BaseApiResponse<CreatePlanResponseDto> create(@Valid @RequestBody PlanRequestDto payload) {
        return BaseApiResponse.success(planService.create(payload));
    }
}
