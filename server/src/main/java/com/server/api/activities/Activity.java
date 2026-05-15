package com.server.api.activities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.api.itineraries.Itinerary;
import com.server.lib.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="mst_activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity extends BaseEntity {
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name="sequence", nullable = false)
    private Long sequence;

    @Column(name="start_time", nullable = true)
    private String startTime;

    @Column(name="end_time", nullable = true)
    private String endTime;

    @Builder.Default
    @Column(name="is_completed", nullable = false)
    private boolean isCompleted = false;

    @Min(0)
    @Column(name="longitude", nullable = true)
    private Double longitude;

    @Min(0)
    @Column(name="latitude", nullable = true)
    private Double latitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="itinerary_id", nullable = false)
    @JsonIgnore
    private Itinerary itinerary;
}
