package com.server.api.itineraries;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.api.activities.Activity;
import com.server.api.locations.Location;
import com.server.api.plans.Plan;
import com.server.lib.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="mst_itineraries")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Itinerary extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="plan_id", nullable = false)
    private Plan plan;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="loc_id", nullable = false)
//    private Location location;

    @OneToMany(mappedBy = "itinerary", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activity> activities;

    @Column(name="day_number", nullable = false)
    private Long dayNumber;

    @Column(name="destination", nullable = false)
    private String destination;
}
