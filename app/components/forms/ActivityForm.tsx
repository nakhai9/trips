"use client";
import { ItineraryActivity } from "@/types/common";
import {
  Box,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { MapPin, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import TripLocationSearch from "../TripLocationSearch";
import { PositionItem } from "../TripOpenStreetMapView";
import TripsTimeRangePicker, {
  TripsTimeRangePickerEvent,
} from "../ui/TripsTimeRangePicker";
const TripOpenStreetMapView = dynamic(
  () => import("../TripOpenStreetMapView"),
  {
    ssr: false,
  },
);

export type ActivityFormProps = {
  initial?: Partial<ItineraryActivity>;
  onChange?: (activity: Partial<ItineraryActivity>) => void;
};

export default function ActivityForm({
  initial = {},
  onChange,
}: ActivityFormProps) {
  const [form, setForm] = useState<Partial<ItineraryActivity>>({
    title: initial.title || "",
    description: initial.description || "",
    startTime: initial.startTime || "",
    endTime: initial.endTime || "",
    addressLine: initial.addressLine || "",
    isCompleted: initial.isCompleted || false,
    longitude: initial.longitude || undefined,
    latitude: initial.latitude || undefined,
  });

  const handleChange = (field: keyof ItineraryActivity, value: any) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange?.(updated);
  };

  const handleTimeChange = (e: TripsTimeRangePickerEvent) => {
    const updated = {
      ...form,
      startTime: e.from || "",
      endTime: e.to || "",
    };
    setForm(updated);
    onChange?.(updated);
  };

  return (
    <Box component="form" sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <TextField
          label="Hoạt động "
          value={form.description}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="Mô tả, ghi chú"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          size="small"
          multiline
          rows={4}
        />
        <TripsTimeRangePicker
          from={initial?.startTime ? initial.startTime : undefined}
          to={initial?.endTime ? initial.endTime : undefined}
          toTitle="Kết thúc"
          fromTitle="Bắt đầu"
          onTimeChange={handleTimeChange}
        />
        {/* <TextField
          label="Địa chỉ"
          value={form.addressLine}
          onChange={(e) => handleChange("addressLine", e.target.value)}
          fullWidth
          size="small"
        /> */}
        {initial.id && (
          <FormControlLabel
            control={
              <Switch
                checked={!!form.isCompleted}
                onChange={(e) => handleChange("isCompleted", e.target.checked)}
              />
            }
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#e35c35",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#e35c35",
              },
              "& .MuiSwitch-track": {
                backgroundColor: "#ccc",
              },
            }}
            label="Hoàn thành"
          />
        )}
        <Box>
          {!initial.addressLine && (
            <TripLocationSearch
              placeholder="Thêm địa chỉ chi tiết"
              onChange={(value) => {
                if (!value) return;
                const updated = {
                  ...form,
                  addressLine: `${value.label} - ${value.display_address}`,
                  longitude: Number(value.coordinates.lon),
                  latitude: Number(value.coordinates.lat),
                };

                setForm(updated);
                onChange?.(updated);
              }}
            />
          )}

          {initial.addressLine && (
            <>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 1.5,
                  py: 1.2,
                  border: "1px solid #e5e7eb",
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#d1d5db",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  spacing={1.2}
                  sx={{
                    overflow: "hidden",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.2,
                    }}
                  >
                    <MapPin size={16} stroke="#e35c35" />
                  </Box>

                  <Stack spacing={0.3} sx={{ minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        color: "#444444",
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {initial.addressLine.split("-")[0]}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#6b7280",
                        fontSize: 12,
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {initial.addressLine.split("-")[1]}
                    </Typography>
                  </Stack>
                </Stack>

                <IconButton
                  size="small"
                  type="button"
                  onClick={() => {
                    handleChange("addressLine", "");
                  }}
                  sx={{
                    ml: 1,
                    transition: "all 0.2s ease",

                    backgroundColor: "#fee2e2",
                    color: "#dc2626",
                  }}
                >
                  <Trash2 size={15} />
                </IconButton>
              </Stack>
              <Box
                component="div"
                sx={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                }}
              >
                <TripOpenStreetMapView
                  positions={[
                    {
                      latitude: initial.latitude,
                      longitude: initial.longitude,
                      label: initial.addressLine.split("-")[0],
                    } as PositionItem,
                  ]}
                />
              </Box>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
