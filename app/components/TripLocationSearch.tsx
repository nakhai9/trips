import BaseInput from "@/libs/components/BaseInput";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  InputAdornment,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import debounce from "lodash/debounce";
import { Map, MapPin } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { LookupItem } from "../types/common";

type TripLocationSearchProps = {
  variant?: "outlined" | "filled" | "standard";
  searchBy?: "city" | "brand";
  placeholder?: string;
  sx?: SxProps<Theme>;
  params?: {
    [key: string]: string;
  };
  onChange?: (value: LookupItem | null) => void;
  onInputChange?: (value: string) => void;
};

export default function TripLocationSearch({
  variant = "outlined",
  searchBy = "city",
  placeholder,
  sx,
  params,
  onChange,
  onInputChange,
}: TripLocationSearchProps) {
  const [options, setOptions] = useState<LookupItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<LookupItem | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOptions = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const locationIqToken = "pk.af2a987e6b93d62a1f8753f10be2e48d";
      const searchText = `${searchTerm.trim()}`;
      const query = `https://api.locationiq.com/v1/autocomplete?key=${locationIqToken}&q=${searchText}&limit=10&dedupe=1&countrycodes=vn&normalizecity=1`;
      const response = await fetch(query);
      const data = await response.json();

      if (data.error) {
        // console.log("Không tìm thấy địa điểm");
        // return;
        return;
      }

      setOptions(
        (data || [])?.map((x: any) => ({
          label: x.display_place,
          value: x.place_id,
          display_address: x.display_address,
          coordinates: {
            lon: x.lon || 0,
            lat: x.lat || 0,
          },
        })),
      );
    } catch (error) {
      console.error("Lỗi Geoapify:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchOptions, 500), []);

  useEffect(() => {
    debouncedFetch(inputValue);
    return () => debouncedFetch.cancel();
  }, [inputValue, debouncedFetch]);

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: LookupItem | string | null,
  ) => {
    let selected: LookupItem | null = null;

    if (newValue && typeof newValue === "object") {
      selected = newValue;
    } else if (typeof newValue === "string" && newValue.trim()) {
      // Tùy chọn: cho phép tạo tạm nếu muốn hỗ trợ free solo
      selected = {
        label: newValue.trim(),
        value: newValue.trim(),
        coordinates: {
          lat: 0,
          lng: 0,
        },
      };
    }

    setValue(selected);
    setInputValue("");
    onChange?.(selected);
  };

  return (
    <Autocomplete
      size="small"
      freeSolo // ← Quan trọng: nên bật khi dùng search động
      value={null}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
        onInputChange?.(newInputValue);
      }}
      sx={{ ...sx }}
      options={options}
      loading={loading}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        return option?.label ?? "";
      }}
      getOptionKey={(option) =>
        typeof option === "string" ? option : option.value
      }
      isOptionEqualToValue={(option, val) =>
        option.value === (typeof val === "string" ? val : val?.value)
      }
      renderInput={(params: AutocompleteRenderInputParams) => (
        <BaseInput
          {...params}
          label=""
          variant={variant}
          placeholder={placeholder}
          slotProps={{
            ...params.InputProps,
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Map size={14} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
      noOptionsText="Không tìm thấy địa chỉ phù hợp"
      loadingText="Đang tìm kiếm..."
      selectOnFocus
      openOnFocus={false} // tránh mở popup rỗng khi focus
      filterOptions={(x) => x}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.value}>
          <Stack direction="column">
            <Stack direction="row" spacing={2} alignItems="center">
              <MapPin />
              <Box>
                <span>{option.label}</span>
                {option["display_address"] && (
                  <Typography variant="body2">
                    {option["display_address"]}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}
    />
  );
}
