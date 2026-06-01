package com.server.api.itineraries;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.server.lib.BaseRepository;

@Repository
public interface ItineraryRepository extends BaseRepository<Itinerary, UUID> {
    List<Itinerary> findItinerariesByPlanId(UUID planId);
}
