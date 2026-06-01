package com.server.api.activities.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.activities.ActivityService;
import com.server.api.activities.dto.ActivityResponseDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Activities", description = "")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class GetActivityController {
    private final ActivityService activityService;
    @GetMapping("/{id}")
    public BaseApiResponse<ActivityResponseDto> get(@PathVariable UUID id) {
        return BaseApiResponse.success(activityService.get(id));
    }
}
