package com.server.api.activities.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.activities.ActivityService;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Activities", description = "")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class DeleteActivityController {
    private final ActivityService activityService;

    @DeleteMapping("/{id}")
    public BaseApiResponse<ResponseId> delete(@PathVariable UUID id) {
        return BaseApiResponse.success(activityService.delete(id));
    }
}
