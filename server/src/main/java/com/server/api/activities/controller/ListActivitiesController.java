package com.server.api.activities.controller;

import com.server.api.activities.ActivityService;
import com.server.api.activities.dto.ActivityResponseDto;
import com.server.lib.BaseApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class ListActivitiesController {
    private final ActivityService activityService;

    @GetMapping
    public BaseApiResponse<List<ActivityResponseDto>> list() {
        return BaseApiResponse.success(activityService.list());
    }
}
