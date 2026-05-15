package com.server.api.itineraries;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.server.lib.BaseRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

@Repository
public interface ItineraryRepository extends BaseRepository<Itinerary, UUID> {
    @EntityGraph(attributePaths = {"location"})   // load cùng 1 query
    Optional<Itinerary> findWithLocationById(UUID id);

    List<Itinerary> findItinerariesByPlanId(UUID planId);
}
