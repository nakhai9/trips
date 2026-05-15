package com.server.lib;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID> {
    // Ví dụ method chung anh hay dùng:
    // boolean existsById(ID id);
    // long count();

    // Nếu sau này anh muốn thêm soft-delete hay findActive thì thêm ở đây
}