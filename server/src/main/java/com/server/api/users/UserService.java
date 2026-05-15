package com.server.api.users;

import com.server.api.users.dto.UserRequestDto;
import com.server.api.users.dto.UserResponseDto;
import com.server.lib.DtoMapper;
import com.server.lib.ResponseId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;

    public ResponseId create(UserRequestDto request) {
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(request.getPassword())
                .role(request.getRole() !=null  ? request.getRole() : UserRole.GUEST)
                .build();

        User savedUser = userRepo.save(user);

        return new ResponseId(savedUser.getId().toString());
    }

    public List<UserResponseDto> list() {
        return DtoMapper.mapList(userRepo.findAll(), this::mapUserToResponse);
    }

    public UserResponseDto get(UUID id) {
        User user = userRepo.findById(id).orElseThrow(()-> new RuntimeException(("User not found")));
        return mapUserToResponse(user);
    }

    private  String encodePassword(String password) {
        return "";
    }
    private UserResponseDto mapUserToResponse(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .role(user.getRole())
                .phone(user.getPhone())
                .email(user.getEmail())
                .lastName(user.getLastName())
                .firstName(user.getFirstName())
                .build();
    }
}