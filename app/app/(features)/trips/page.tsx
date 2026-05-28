"use client";

import RootLayout from "@/components/layout/RootLayout";
import TripsCard from "@/components/ui/TripsCard";
import TripsDateRangePicker, {
    TripsDateRangePickerProps,
} from "@/components/ui/TripsDateRangePicker";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import BaseInput from "@/libs/components/BaseInput";
import BaseModal from "@/libs/components/modal/BaseModal";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { ResponseId } from "@/types/api";
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type TripForm = {
  title: string;
  startDate: Dayjs;
  endDate: Dayjs;
  isPublic: boolean;
  accessCode: string;
};

function useFetchTrips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useGlobalStore();

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      setIsLoading(true);
      setError(null);

      const res = await HttpClient.get<any>(API_URLS.plan);
      setTrips(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }, [setIsLoading]);

  return { trips, loading, error, onLoadTrips: fetchTrips };
}

export default function TripPage() {
  const { trips, onLoadTrips } = useFetchTrips();
  const { showError, showSuccess } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoading, isLoading } = useGlobalStore();
  const router = useRouter();

  const [trip, setTrip] = useState<TripForm | null>({
    title: "",
    startDate: dayjs().add(1, "day"),
    endDate: dayjs().add(2, "day"),
    isPublic: false,
    accessCode: "",
  });

  const updateTrip = (data: Partial<TripForm>) => {
    setTrip((prev) =>
      prev
        ? {
            ...prev,
            ...data,
          }
        : null,
    );
  };

  const handleSave = async () => {
    setIsOpen(false);
    try {
      if (!trip?.title) {
        showError("Bạn chưa đặt tên cho lịch trình");
        return;
      }

      setIsLoading(true, "Đang tạo lịch trình");

      const payload = {
        title: trip.title,
        description: "trip.description",
        isPublic: trip.isPublic,
        accessCode: trip.accessCode,
        startDate: dayjs(trip.startDate).toISOString(),
        endDate: dayjs(trip.endDate).toISOString(),
      };

      resetForm();

      const res = await HttpClient.post<ResponseId>(API_URLS.plan, payload);

      if (res?.id) {
        showSuccess("Tạo hành trình thành công");
        router.push(`/trips/${res.id}`);
      }
    } catch (error: any) {
      showError(error?.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
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

  const resetForm = () => {
    setTrip({
      title: "",
      startDate: dayjs().add(1, "day"),
      endDate: dayjs().add(2, "day"),
      accessCode: "",
      isPublic: false,
    });
  };

  const handleDateChange = (event: TripsDateRangePickerProps) => {
    validate(event);
    updateTrip({
      startDate: dayjs(event.from),
      endDate: dayjs(event.to),
    });
  };

  useEffect(() => {
    onLoadTrips();
  }, [onLoadTrips]);

  return (
    <>
      <RootLayout>
        <Stack direction="column" spacing={2}>
          <Box sx={{ pt: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="h4"
                sx={{ color: "#334155", fontWeight: 600, letterSpacing: 1.2 }}
              >
                Lịch trình
              </Typography>

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
                  borderRadius: 50,
                  textTransform: "none",
                  boxShadow: "0 2px 12px #e35c3530",
                  "&:hover": { background: "#c94e2d" },
                }}
                startIcon={<Plus size={16} />}
                onClick={() => setIsOpen(!isOpen)}
              >
                Lịch trình mới
              </Button>
            </Stack>
          </Box>

          {!trips.length && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Không có dữ liệu
            </Box>
          )}

          <Grid container spacing={2}>
            {trips.map((x) => (
              <Grid key={x.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <TripsCard
                  id={x.id}
                  title={x.title}
                  isPublic={x.isPublic}
                  startDate={x.startDate}
                  endDate={x.endDate}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </RootLayout>
      <BaseModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          resetForm();
        }}
        title="Chuyến đi mới"
        maxWidth={"sm"}
        actions={
          <>
            <Button
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
            >
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
              disabled={isLoading}
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
              value={trip?.title || ""}
              size="small"
              onChange={(e) =>
                updateTrip({
                  title: e?.target.value || "",
                })
              }
            />

            <TripsDateRangePicker
              from={trip?.startDate ? dayjs(trip.startDate) : undefined}
              to={trip?.endDate ? dayjs(trip.endDate) : undefined}
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
                  checked={!!trip?.isPublic}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    updateTrip({
                      isPublic: checked,
                      accessCode: checked ? trip?.accessCode || "" : "",
                    });
                  }}
                />
              }
              label="Riêng tư"
            />

            <BaseInput
              sx={{
                display: !trip?.isPublic ? "none" : "block",
              }}
              type="password"
              label="Mã truy cập"
              value={trip?.accessCode || ""}
              size="small"
              onChange={(e) =>
                updateTrip({
                  accessCode: e.target.value,
                })
              }
            />
          </Stack>
        </Box>
      </BaseModal>
    </>
  );
}
