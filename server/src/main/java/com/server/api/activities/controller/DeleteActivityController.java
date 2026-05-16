package com.server.api.activities.controller;

import com.server.api.activities.ActivityService;
import com.server.api.activities.dto.ActivityRequestDto;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
