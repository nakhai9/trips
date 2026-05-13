"use client";
import { Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export type TripsDateRangePickerEvent = {
  to: Dayjs | undefined;
  from: Dayjs | undefined;
};
export type TripsDateRangePickerProps = {
  from: Dayjs | undefined;
  fromTitle?: string;
  to: Dayjs | undefined;
  toTitle?: string;
  format?: string;
  onDateChange?: ({ from, to }: TripsDateRangePickerEvent) => void;
};
export default function TripsDateRangePicker({
  from,
  to,
  fromTitle = "From",
  toTitle = "To",
  format = "YYYY-MM-DD",
  onDateChange,
}: TripsDateRangePickerProps) {
  return (
    <Stack direction="row" gap={2}>
      <DatePicker
        label={fromTitle}
        value={from ? dayjs(from) : null}
        slotProps={{ textField: { size: "small", required: true } }}
        onChange={(value: Dayjs | null) => {
          onDateChange?.({ from: value || undefined, to });
        }}
        format={format}
      />
      đến
      <DatePicker
        label={toTitle}
        value={to ? dayjs(to) : null}
        slotProps={{ textField: { size: "small", required: true } }}
        onChange={(value: Dayjs | null) => {
          onDateChange?.({ from, to: value || undefined });
        }}
        format={format}
      />
    </Stack>
  );
}
