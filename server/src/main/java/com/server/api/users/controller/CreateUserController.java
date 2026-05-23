package com.server.api.users.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.api.users.UserService;
import com.server.api.users.dto.UserRequestDto;
import com.server.lib.BaseApiResponse;
import com.server.lib.ResponseId;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "")
public class CreateUserController {
    private final UserService userService;

    @PostMapping
    public BaseApiResponse<ResponseId> create(@Valid @RequestBody UserRequestDto payload) {
        return BaseApiResponse.success(userService.create(payload));
    }

}
