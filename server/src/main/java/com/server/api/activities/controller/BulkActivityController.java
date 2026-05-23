package com.server.api.activities.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
