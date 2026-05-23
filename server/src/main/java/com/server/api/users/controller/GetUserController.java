package com.server.api.users.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.users.UserService;
import com.server.api.users.dto.UserResponseDto;
import com.server.lib.BaseApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "")
public class GetUserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public BaseApiResponse<UserResponseDto> get(@PathVariable UUID id) {
        return BaseApiResponse.success(userService.get(id));
    }
}