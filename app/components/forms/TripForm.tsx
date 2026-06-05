"use client";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import BaseInput from "@/libs/components/BaseInput";
import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import BaseModalBody from "@/libs/components/modal/BaseModalBody";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { ResponseId } from "@/types/api";
import { Box, Button, FormControlLabel, Stack, Switch } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TripsDateRangePicker, {
  TripsDateRangePickerProps,
} from "../ui/TripsDateRangePicker";
const TripOpenStreetMapView = dynamic(
  () => import("../TripOpenStreetMapView"),
  {
    ssr: false,
  },
);

type TripForm = {
  title: string;
  startDate: Dayjs;
  endDate: Dayjs;
  isPublic: boolean;
  accessCode: string;
};

export type TripFormProps = {};

export default function TripForm({}: TripFormProps) {
  const { config, closeBdm } = useBaseDynamicModal();
  const { showError, showSuccess } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState<Partial<TripForm> | null>({
    title: "",
    startDate: dayjs().add(1, "day"),
    endDate: dayjs().add(2, "day"),
    isPublic: true,
    accessCode: "",
  });

  const updateTrip = (data: Partial<TripForm>) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            ...data,
          }
        : null,
    );
  };

  const handleCancel = () => {
    closeBdm();
  };

  const handleSave = async () => {
    try {
      if (!form?.title) {
        showError("Bạn chưa đặt tên cho lịch trình");
        return;
      }

      console.log(form);

      if (!form.isPublic && !form.accessCode?.trim()) {
        showError("Mã truy cập là bắt buộc");
        return;
      }

      closeBdm();

      setLoading(true);

      const payload = {
        title: form.title,
        description: "form.description",
        isPublic: form.accessCode ? false : true,
        accessCode: form.accessCode,
        startDate: dayjs(form.startDate).toISOString(),
        endDate: dayjs(form.endDate).toISOString(),
      };

      const res = await HttpClient.post<ResponseId>(API_URLS.plan, payload);

      if (res?.id) {
        showSuccess("Tạo hành trình thành công");
        router.push(`/trips/${res.id}`);
      }
    } catch (error: any) {
      showError(error?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const validate = (e: TripsDateRangePickerProps) => {
    const isBeforeToday = dayjs(e.from)?.isBefore(dayjs());
    if (isBeforeToday) {
      showError("Ngày bắt đầu không được ở quá khứ");
      return;
    }

    if (!e.to) return;
    const start = dayjs(e.from);

    if (
      dayjs(e.to).isBefore(start, "day") ||
      dayjs(e.to).isBefore(dayjs(), "day")
    ) {
      showError("Ngày kết thúc không được trước ngày bắt đầu hoặc ở quá khứ");
      return;
    }
  };

  const handleDateChange = (event: TripsDateRangePickerProps) => {
    validate(event);
    updateTrip({
      startDate: dayjs(event.from),
      endDate: dayjs(event.to),
    });
  };

  return (
    <BaseModalBody
      actions={
        <>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              background: "#e35c35",
              color: "#fff",
              fontWeight: 500,
              fontSize: 14,
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "0 2px 12px #e35c3530",
              "&:hover": { background: "#c94e2d" },
            }}
            onClick={handleSave}
            disabled={loading}
          >
            Lưu
          </Button>
        </>
      }
    >
      <Box component="form">
        <Stack spacing={2}>
          <BaseInput
            label="Tên hành trình"
            value={form?.title || ""}
            size="small"
            onChange={(e) =>
              updateTrip({
                title: e?.target.value || "",
              })
            }
          />

          <TripsDateRangePicker
            from={form?.startDate ? dayjs(form.startDate) : undefined}
            to={form?.endDate ? dayjs(form.endDate) : undefined}
            toTitle="Kết thúc"
            fromTitle="Bắt đầu"
            onDateChange={(event) => handleDateChange(event)}
          />

          <FormControlLabel
            control={
              <Switch
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
                checked={!form?.isPublic}
                onChange={(e) => {
                  const isPrivate = e.target.checked;

                  updateTrip({
                    isPublic: !isPrivate,
                    accessCode: isPrivate ? form?.accessCode || "" : "",
                  });
                }}
              />
            }
            label="Riêng tư"
          />

          <BaseInput
            sx={{
              display: form?.isPublic ? "none" : "block",
            }}
            type="password"
            label="Mã truy cập"
            value={form?.accessCode || ""}
            size="small"
            onChange={(e) =>
              updateTrip({
                accessCode: e.target.value,
              })
            }
          />
        </Stack>
      </Box>
    </BaseModalBody>
  );
}
