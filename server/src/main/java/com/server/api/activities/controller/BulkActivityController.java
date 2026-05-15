package com.server.api.activities.controller;

import com.server.api.activities.ActivityService;
import com.server.api.activities.dto.ActivityRequestDto;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class BulkActivityController {
    private final ActivityService activityService;

    @PostMapping("/bulk/create")
    public BaseApiResponse<List<ResponseId>> bulkCreate(@RequestBody @Valid List<ActivityRequestDto> payload) {
        activityService.saveAll(payload);
        List<ResponseId> response = payload
                .stream()
                .map(ActivityRequestDto::getItineraryId)
                .map(UUID::toString)
                .map(ResponseId::new)
                .collect(Collectors.toList());
        return BaseApiResponse.success(response);
    }
}
