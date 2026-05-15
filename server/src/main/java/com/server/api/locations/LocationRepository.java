package com.server.api.locations;

import java.util.UUID;

import com.server.lib.BaseRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends BaseRepository<Location, UUID>, JpaSpecificationExecutor<Location> {
}
