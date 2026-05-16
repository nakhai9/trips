package com.server.api.activities.controller;

import com.server.api.activities.ActivityService;
import com.server.api.activities.dto.ActivityRequestDto;
import com.server.api.activities.dto.ActivityResponseDto;
import com.server.lib.BaseApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
