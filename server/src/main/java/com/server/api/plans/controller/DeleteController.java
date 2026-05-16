package com.server.api.plans.controller;

import com.server.api.plans.PlanService;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class DeleteController {
    private final PlanService planService;
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        planService.delete(id);
    }
}
