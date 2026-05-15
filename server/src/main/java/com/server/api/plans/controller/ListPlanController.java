package com.server.api.plans.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.plans.PlanService;
import com.server.api.plans.dto.PlanResponseDto;
import com.server.lib.BaseApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class ListPlanController {
    private final PlanService planService;

    @GetMapping
    public BaseApiResponse<List<PlanResponseDto>> list() {
        return BaseApiResponse.success(planService.list());
    }
}
