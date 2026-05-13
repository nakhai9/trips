"use client";
import { Stack, TextField } from "@mui/material";

export type TripsTimeRangePickerEvent = {
  to: string | undefined;
  from: string | undefined;
};
type TripsTimeRangePickerProps = {
  from?: string;
  fromTitle?: string;
  to?: string;
  toTitle?: string;
  format?: string;
  onTimeChange?: ({ from, to }: TripsTimeRangePickerEvent) => void;
};
export default function TripsTimeRangePicker({
  from,
  to,
  fromTitle = "From",
  toTitle = "To",
  format = "YYYY-MM-DD",
  onTimeChange,
}: TripsTimeRangePickerProps) {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="Thời gian bắt đầu"
        type="time"
        value={from ?? ""}
        onChange={(e) => {
          onTimeChange?.({
            from: e.target.value || undefined,
            to,
          });
        }}
        fullWidth
        size="small"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      {/* <TextField
        label="Thời gian kết thúc"
        type="time"
        value={to ?? ""}
        onChange={(e) => {
          onTimeChange?.({
            to: e.target.value || undefined,
            from,
          });
        }}
        fullWidth
        size="small"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      /> */}
    </Stack>
  );
}
