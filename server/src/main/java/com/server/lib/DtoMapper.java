package com.server.lib;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class DtoMapper {
    public static <E, D> List<D> mapList(List<E> entities, Function<E,D> mapper) {
        return entities.stream().map(mapper).collect(Collectors.toList());
    }
}
