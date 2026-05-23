package com.server.api.activities.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.activities.ActivityService;
import com.server.api.activities.dto.ActivityRequestDto;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Activities", description = "")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class CreateActivityController {
    private final ActivityService activityService;

    @PostMapping
    public BaseApiResponse<ResponseId> create(@Valid @RequestBody ActivityRequestDto payload) {
        return BaseApiResponse.success(activityService.create(payload));
    }
}
