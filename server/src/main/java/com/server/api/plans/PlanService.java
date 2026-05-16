package com.server.api.plans;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.server.api.plans.dto.CreatePlanResponseDto;
import com.server.api.plans.dto.PlanRequestDto;
import com.server.api.plans.dto.PlanResponseDto;
import com.server.api.users.User;
import com.server.api.users.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlanService {
    private final PlanRepository planRepository;
    private final UserRepository userRepo;

    private static final String SUPER_GUEST_EMAIL = "superguest@lite.com";

    public CreatePlanResponseDto create(PlanRequestDto request) {

        User user =null;

        if(request.getUserId() != null) {
            user = userRepo.findById(request.getUserId()).orElse(null);
        }

        if(user == null) {
            user = userRepo.findByEmail(SUPER_GUEST_EMAIL).orElseThrow(() -> new RuntimeException("Super Guest user not found"));
        }

        Plan plan = Plan.builder()
                .title(request.getTitle())
                .isPublic(request.isPublic())
                .accessCode(request.isPublic() ? null : request.getAccessCode())
                .user(user)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        Plan savedPlan = planRepository.save(plan);

        return mapToCreateResponseDto(savedPlan);
    }

    public List<PlanResponseDto> list() {
        return planRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PlanResponseDto get(UUID id) {
        Plan plan = planRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy plan theo Id" + id));
        return mapToResponse(plan);
    }

    public PlanResponseDto update(UUID id, PlanRequestDto request) {
        Plan plan = planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy plan theo Id " + id));

        plan.setTitle(request.getTitle());
        plan.setStartDate(request.getStartDate());
        plan.setEndDate(request.getEndDate());
        plan.setPublic(request.isPublic());
        plan.setAccessCode(request.isPublic() ? null : request.getAccessCode());

        Plan savedPlan = planRepository.save(plan);
        return mapToResponse(savedPlan);
    }

    private PlanResponseDto mapToResponse(Plan plan) {
        return PlanResponseDto.builder()
                .id(plan.getId())
                .title(plan.getTitle())
                .startDate(plan.getStartDate())
                .endDate(plan.getEndDate())
                .canView(true)
                .accessCode(plan.getAccessCode())
                .isPublic(plan.isPublic())
                .build();
    }

    private CreatePlanResponseDto mapToCreateResponseDto(Plan plan) {
        return CreatePlanResponseDto.builder()
                .id(plan.getId())
                .title(plan.getTitle())
                .startDate(plan.getStartDate())
                .endDate(plan.getEndDate())
                .build();
    }

    public void delete(UUID id) {
        Plan plan = planRepository.findById(id).orElseThrow(() -> new RuntimeException(("Plan not found")));
        planRepository.delete(plan);
    }
}
