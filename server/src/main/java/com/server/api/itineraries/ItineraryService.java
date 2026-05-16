package com.server.api.itineraries;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.server.api.activities.Activity;
import com.server.api.activities.dto.ActivityResponseDto;
import com.server.api.itineraries.dto.ItineraryRequestDto;
import com.server.api.itineraries.dto.ItineraryResponseDto;
import com.server.api.plans.Plan;
import com.server.api.plans.PlanRepository;
import com.server.lib.DtoMapper;
import com.server.lib.ResponseId;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItineraryService {
    private final ItineraryRepository itineraryRepo;
    private final PlanRepository planRepo;

    public ResponseId create(ItineraryRequestDto request) {
        Plan plan = null;
        if (request.getPlanId() != null) {
            plan = planRepo.findById(request.getPlanId()).orElseThrow(() -> new RuntimeException("Không tìm thấy địa điểm với ID: " + request.getPlanId()));
        } else  {
            throw new RuntimeException("Plan ID là bắt buộc");
        }

        Itinerary itinerary = Itinerary.builder()
                .dayNumber(request.getDayNumber())
                .plan(plan)
                .destination((request.getDestination()))
                .build();
        Itinerary savedItinerary = itineraryRepo.save(itinerary);
        return new ResponseId(savedItinerary.getId().toString());
    }

    public List<ItineraryResponseDto> list(UUID planId) {
        List<Itinerary> itineraries = planId != null ? itineraryRepo.findItinerariesByPlanId(planId) : itineraryRepo.findAll();
        return DtoMapper.mapList(itineraries, this::mapToResponse);
    }

    public ItineraryResponseDto get(UUID id) {
        Itinerary itinerary = itineraryRepo.findWithLocationById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch trình với id: " + id));

        return mapToResponse(itinerary);
    }

    private ItineraryResponseDto mapToResponse(Itinerary itinerary) {
        return ItineraryResponseDto.builder()
                .id(itinerary.getId())
                .dayNumber(itinerary.getDayNumber())
                .planId(itinerary.getPlan().getId())
                .destination(itinerary.getDestination())
                .activities(itinerary.getActivities().stream()
                        .map(this::mapActivity)
                        .toList())
                .build();
    }

    private ActivityResponseDto mapActivity(Activity activity) {
        return ActivityResponseDto.builder()
                .id(activity.getId())
                .itineraryId(activity.getItinerary().getId())
                .description(activity.getDescription())
                .sequence(activity.getSequence())
                .startTime(activity.getStartTime())
                .endTime(activity.getEndTime())
                .longitude(activity.getLongitude())
                .latitude(activity.getLatitude())
                .addressLine(activity.getAddressLine())
                .isCompleted(activity.isCompleted())
                .build();
    }

    public ResponseId delete(UUID id) {
        Itinerary itinerary = itineraryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        itineraryRepo.delete(itinerary);

        return new ResponseId(itinerary.getId().toString());
    }

    public ResponseId update(UUID id, ItineraryRequestDto payload) {
        Itinerary itinerary = itineraryRepo.findById(id).orElseThrow(()->new RuntimeException("Không tìm thấy lịch trình"));

        if (payload.getDayNumber() != null) {
            itinerary.setDayNumber(payload.getDayNumber());
        }

        if (payload.getDestination() != null) {
            itinerary.setDestination(payload.getDestination());
        }

        if (payload.getPlanId() != null) {

            Plan plan = planRepo.findById(payload.getPlanId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy plan"));

            itinerary.setPlan(plan);
        }

        // Update Plan (nếu có)
        if (payload.getPlanId() != null) {
            Plan plan = planRepo.findById(payload.getPlanId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy plan"));
            itinerary.setPlan(plan);
        }

        itineraryRepo.save(itinerary);

        return new ResponseId(itinerary.getId().toString());
    }
}
