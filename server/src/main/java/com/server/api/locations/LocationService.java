package com.server.api.locations;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.server.api.locations.dto.LocationFilter;
import com.server.api.locations.dto.LocationResponseDto;
import com.server.lib.DtoMapper;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepo;

    public LocationResponseDto get(UUID id) {
        return locationRepo.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy địa điểm với ID: " + id));
    }

    public List<LocationResponseDto> list(LocationFilter filters) {
        Specification<Location> spec = (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();


            if (filters.getStatus() != null && "new".equalsIgnoreCase(filters.getStatus())) {
                predicates.add(cb.equal(root.get("isMerged"), false));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return DtoMapper.mapList(locationRepo.findAll(
                spec,
                Sort.by(Sort.Direction.ASC, "codeName")), this::mapToResponse);
    }

    private LocationResponseDto mapToResponse(Location location) {
        return LocationResponseDto.builder()
                .id(location.getId())
                .name(location.getName())
                .codeName(location.getCodeName())
                .countryCode(location.getCountryCode())
                .mergedInto(location.getMergedInto())
                .isMerged(location.isMerged())
                .build();
    }
}
