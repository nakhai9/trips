package com.server.api.plans.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.plans.PlanService;
import com.server.api.plans.dto.PlanResponseDto;
import com.server.lib.BaseApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class GetPlanController {
    private final PlanService planService;

    @GetMapping("/{id}")
    public BaseApiResponse<PlanResponseDto> get(@PathVariable UUID id) {
        return BaseApiResponse.success(planService.get(id));
    }
}
