package com.server.api.plans;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.server.api.itineraries.Itinerary;
import com.server.api.users.User;
import com.server.lib.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mst_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan extends BaseEntity {

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @Builder.Default
    @Column(length = 100)
    private String title = "TRAVEL PLAN";

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name="access_code", nullable=true)
    private String accessCode;

    @Builder.Default
    @Column(name = "viewCount", nullable = false)
    private Long viewCount = 0L;

    @Builder.Default
    @Column(name="is_public", nullable = false)
    private Boolean isPublic = true;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Itinerary> itineraries = new ArrayList<>();
}