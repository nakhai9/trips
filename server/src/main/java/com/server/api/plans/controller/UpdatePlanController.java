package com.server.api.plans.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.plans.PlanService;
import com.server.api.plans.dto.PlanRequestDto;
import com.server.api.plans.dto.PlanResponseDto;
import com.server.lib.BaseApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class UpdatePlanController {
    private final PlanService planService;

    @PutMapping("/{id}")
    public BaseApiResponse<PlanResponseDto> update(@PathVariable UUID id, @Valid @RequestBody PlanRequestDto payload) {
        return BaseApiResponse.success(planService.update(id, payload));
    }
}
