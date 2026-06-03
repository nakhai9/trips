package com.server.api.plans.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.plans.PlanService;
import com.server.api.plans.dto.PlanResponseDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Plans", description = "")
@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class GetPlanController {
    private final PlanService planService;

    @PostMapping("/{id}")
    public BaseApiResponse<PlanResponseDto> get(@PathVariable UUID id, @RequestParam(value = "accessCode", required = false) String accessCode) {
        return BaseApiResponse.success(planService.get(id, accessCode));
    }
}
