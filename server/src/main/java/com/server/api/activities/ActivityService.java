package com.server.api.activities;

import com.server.api.activities.dto.ActivityRequestDto;
import com.server.api.activities.dto.ActivityResponseDto;
import com.server.api.itineraries.Itinerary;
import com.server.api.itineraries.ItineraryRepository;
import com.server.lib.DtoMapper;
import com.server.lib.ResponseId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepo;
    private final ItineraryRepository itineraryRepo;

    public List<ActivityResponseDto> list() {
        return DtoMapper.mapList(activityRepo.findAll(), this::mapToResponse);
    }

    public ResponseId create(ActivityRequestDto payload) {
        Itinerary itinerary = itineraryRepo
                .findById(payload.getItineraryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch trình id: "+ payload.getItineraryId()));

        Activity activity = Activity.builder()
                .sequence(payload.getSequence())
                .startTime(payload.getStartTime())
                .endTime(payload.getEndTime())
                .description(payload.getDescription())
                .longitude(payload.getLongitude())
                .latitude(payload.getLatitude())
                .isCompleted(Boolean.TRUE.equals(payload.getIsCompleted()))
                .itinerary(itinerary)
                .build();

        Activity savedActivity = activityRepo.save(activity);

        return new ResponseId(savedActivity.getId().toString());
    }

    private ActivityResponseDto mapToResponse(Activity activity) {
        return ActivityResponseDto.builder()
                .id(activity.getId())
                .startTime(activity.getStartTime())
                .endTime(activity.getEndTime())
                .description(activity.getDescription())
                .itineraryId(activity.getItinerary().getId())
                .sequence(activity.getSequence())
                .longitude(activity.getLongitude())
                .latitude(activity.getLatitude())
                .isCompleted(activity.isCompleted())
                .build();
    }

    public void saveAll(List<ActivityRequestDto> payload) {
        List<Activity> activities = new ArrayList<>();

        for (ActivityRequestDto dto : payload) {
            Activity activity = new Activity();           // hoặc dùng constructor / builder nếu em có

            activity.setDescription(dto.getDescription());
            activity.setSequence(dto.getSequence() != null ? dto.getSequence() : 1L);
            activity.setStartTime(dto.getStartTime());
            activity.setEndTime(dto.getEndTime());
            activity.setLongitude(dto.getLongitude());
            activity.setLatitude(dto.getLatitude());
            activity.setCompleted(Boolean.TRUE.equals(dto.getIsCompleted()));

            // Itinerary (nếu dùng JPA)
            Itinerary itinerary = itineraryRepo.findById(dto.getItineraryId())
                    .orElseThrow(() -> new RuntimeException("Itinerary not found"));
            activity.setItinerary(itinerary);

            activities.add(activity);
        }

        // 🔥 SaveAll bằng JPA (hoặc chuyển sang JDBC batch nếu em muốn nhanh hơn)
        List<Activity> savedList = activityRepo.saveAll(activities);
    }

    public ResponseId delete(UUID id) {
        Activity activity = activityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hoạt động"));
        activityRepo.delete(activity);
        return new ResponseId(activity.getId().toString());
    }

    public ActivityResponseDto update(UUID id, ActivityRequestDto payload) {
        Activity activity = activityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hoạt động"));

        if (payload.getDescription() != null && !payload.getDescription().isBlank()) {
            activity.setDescription(payload.getDescription());
        }
        if (payload.getSequence() != null) {
            activity.setSequence(payload.getSequence());
        }
        activity.setStartTime(payload.getStartTime());
        activity.setEndTime(payload.getEndTime());
        activity.setLatitude(payload.getLatitude());
        activity.setLongitude(payload.getLongitude());
        if (payload.getIsCompleted() != null) {
            activity.setCompleted(payload.getIsCompleted());
        }

        Activity saved = activityRepo.save(activity);
        return mapToResponse(saved);
    }
}
