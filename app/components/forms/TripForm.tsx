"use client";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import BaseInput from "@/libs/components/BaseInput";
import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import BaseModalBody from "@/libs/components/modal/BaseModalBody";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { ResponseId } from "@/types/api";
import { Trip } from "@/types/common";
import { Box, Button, FormControlLabel, Stack, Switch } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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

function useFetchTrip() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useGlobalStore();
  const { showError, showSuccess } = useToast();

  const fetchTrip = useCallback(async (tripID: string, accessCode?: string) => {
    try {
      setLoading(true);
      setIsLoading(true);
      const data = await HttpClient.post<Trip>(`${API_URLS.plan}/${tripID}`, {
        accessCode,
      });
      setTrip(data);
      return data;
    } catch (err: any) {
      showError(err);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }, []);

  return { trip, loading, error, fetchTrip };
}

export default function TripForm({}: TripFormProps) {
  const { config, closeBdm } = useBaseDynamicModal();
  const { showError, showSuccess } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { fetchTrip, trip } = useFetchTrip();
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

      if (!form.isPublic && !form.accessCode?.trim() && !config?.formData?.id) {
        showError("Mã truy cập là bắt buộc");
        return;
      }

      if (
        !form.isPublic &&
        (form.accessCode || "").trim().length < 8 &&
        !config?.formData?.id
      ) {
        showError("Mã truy cập tối đa 8 kí tự");
      }

      closeBdm();

      setLoading(true);

      let payload = {
        title: form.title,
        description: "form.description",
        isPublic: config?.formData?.id
          ? form.isPublic
          : form.accessCode
            ? false
            : true,
        startDate: dayjs(form.startDate).toISOString(),
        endDate: dayjs(form.endDate).toISOString(),
      };

      if (config?.formData?.id) {
        console.log(payload);
        const res = await HttpClient.put<ResponseId>(
          `${API_URLS.plan}/${config?.formData?.id}`,
          payload,
        );

        if (res?.id) {
          showSuccess("Cập nhật thành công");
        }
      } else {
        const res = await HttpClient.post<ResponseId>(API_URLS.plan, {
          ...payload,
          accessCode: form.accessCode,
        });

        if (res?.id) {
          showSuccess("Tạo hành trình thành công");
          router.push(`/trips/${res.id}`);
        }
      }

      config?.formData?.reloadFn?.();
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

  useEffect(() => {
    if (!config?.formData?.id) return;
    fetchTrip(config?.formData?.id);
  }, [config?.formData?.id]);

  useEffect(() => {
    if (!trip) return;
    if (trip) {
      setForm({
        ...form,
        title: trip.title,
        endDate: dayjs(trip.endDate),
        startDate: dayjs(trip.startDate),
        isPublic: trip.isPublic,
        accessCode: trip.accessCode,
      });
    }
  }, [trip]);

  return (
    <BaseModalBody
      actions={
        <>
          <Button size="small" onClick={handleCancel}>
            Hủy
          </Button>
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
            disabled={loading || !form?.title}
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
            disabled={config?.formData?.id}
            onChange={(e) =>
              updateTrip({
                accessCode: e.target.value,
              })
            }
            helperText={
              config?.formData?.id
                ? "(*) Hiện tại chức năng đổi mã truy cập chưa khả dụng"
                : "Mã truy cập tối đa 8 kí tự."
            }
          />
        </Stack>
      </Box>
    </BaseModalBody>
  );
}
