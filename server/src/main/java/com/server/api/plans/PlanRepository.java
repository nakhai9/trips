package com.server.api.plans;

import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import com.server.lib.BaseRepository;

public interface PlanRepository extends BaseRepository<Plan, UUID> {
    // JPQL, Modifying sử dụng cho UPDATE, DELETE nếu dùng query không tự hiểu là select
    @Modifying
    @Query("""
            UPDATE Plan p
            SET p.viewCount = p.viewCount + 1
            WHERE p.id = :id
            """)
    int incrementViewCount(@Param("id") UUID id);
}
