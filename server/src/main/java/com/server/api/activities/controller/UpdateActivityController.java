package com.server.api.activities.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.activities.ActivityService;
import com.server.api.activities.dto.ActivityRequestDto;
import com.server.api.activities.dto.ActivityResponseDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Activities", description = "")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class UpdateActivityController {
    private final ActivityService activityService;

    @PutMapping("/{id}")
    public BaseApiResponse<ActivityResponseDto> update(@PathVariable UUID id, @RequestBody @Valid ActivityRequestDto payload) {
        return BaseApiResponse.success(activityService.update(id, payload));
    }
}
