package com.server.api.locations;

import com.server.lib.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="mst_locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location extends BaseEntity {
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name="country_code", nullable = false)
    private String countryCode;

    @Column(name="code_name", nullable = false)
    private String codeName;

    @Column(name="`merged_into`", nullable = true)
    private String mergedInto;

    @Builder.Default
    @Column(name="is_merged", nullable = false)
    private boolean isMerged = false;

//    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
//    @Builder.Default
//    private List<Itinerary> itineraries = new ArrayList<>();
}
