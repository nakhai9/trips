"use client";
import { ItineraryActivity } from "@/types/common";
import { Box, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { useState } from "react";
import TripsTimeRangePicker, {
  TripsTimeRangePickerEvent,
} from "../ui/TripsTimeRangePicker";

export type ActivityFormProps = {
  initial?: Partial<ItineraryActivity>;
  onChange?: (activity: Partial<ItineraryActivity>) => void;
};

export default function ActivityForm({
  initial = {},
  onChange,
}: ActivityFormProps) {
  const [form, setForm] = useState<Partial<ItineraryActivity>>({
    description: initial.description || "",
    startTime: initial.startTime || "",
    endTime: initial.endTime || "",
    addressLine: initial.addressLine || "",
    isCompleted: initial.isCompleted || false,
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
          label="Mô tả hoạt động"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          size="small"
        />
        <TripsTimeRangePicker
          from={initial?.startTime ? initial.startTime : undefined}
          to={initial?.endTime ? initial.endTime : undefined}
          toTitle="Kết thúc"
          fromTitle="Bắt đầu"
          onTimeChange={handleTimeChange}
        />
        <TextField
          label="Địa chỉ"
          value={form.addressLine}
          onChange={(e) => handleChange("addressLine", e.target.value)}
          fullWidth
          size="small"
        />
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
      </Stack>
    </Box>
  );
}
