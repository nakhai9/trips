"use client";

import RootLayout from "@/components/layout/RootLayout";
import TripCard from "@/components/ui/TripCard";
import TripsDateRangePicker from "@/components/ui/TripsDateRangePicker";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import BaseInput from "@/libs/components/BaseInput";
import { useBaseModalStore } from "@/libs/components/modal/BaseModalStore";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { Trip } from "@/types/common";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { title } from "process";
import { useCallback, useEffect, useState } from "react";

type TripModalProps = {
  trip: Partial<Trip>;
  onFormChange?: (data: any) => void;
};

function TripModal({ trip }: TripModalProps) {
  const { set } = useBaseModalStore();
  return (
    <Stack spacing={3}>
      <BaseInput
        label="Tên hành trình"
        value={title}
        size="small"
        onChange={(e) =>
          set<Partial<Trip>>({
            title: e.target.value,
            startDate: trip.startDate,
            endDate: trip.endDate,
          })
        }
      />

      <TripsDateRangePicker
        from={dayjs(trip.startDate)}
        to={dayjs(trip.endDate)}
        onDateChange={({ from, to }) =>
          set({
            title,
            startDate: from?.toDate(),
            endDate: to?.toDate(),
          })
        }
      />
    </Stack>
  );
}

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

      const data = await HttpClient.get<any>(API_URLS.plan);

      setTrips(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }, []);

  return { trips, loading, error, onLoadTrips: fetchTrips };
}

export default function TripPage() {
  const { trips, onLoadTrips } = useFetchTrips();
  const { showError, showSuccess } = useToast();

  const { data, isOpen, open, set } = useBaseModalStore();

  const handleSave = async () => {
    try {
      const value = data as unknown as Partial<Trip>;
      if (!value.title) {
        showError("Bạn chưa đặt tên cho lịch trình");
        return;
      }

      const payload = {
        title: title,
        description: "tripData.description",
        isPublic: true,
        accessCode: null,
        startDate: dayjs(value.startDate).toISOString(),
        endDate: dayjs(value.endDate).toISOString(),
      };
      // const result = await HttpClient.post<ResponseId>(API_URLS.plan, );

      showSuccess("Tạo hành trình thành công");
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  useEffect(() => {
    // onLoadTrips();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    console.log("hello");
    set({
      title: "",
      description: "",
      startDate: dayjs().add(1, "day"),
      endDate: dayjs().add(2, "day"),
      accessCode: "",
      isPrivate: false,
    });
  }, [isOpen]);

  return (
    <RootLayout>
      <Stack direction="column" spacing={2}>
        <Box sx={{ pt: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              sx={{ color: "#444444", fontWeight: 600, fontSize: 18 }}
            >
              Những chuyến đi của bạn
            </Typography>

            <Box>
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
                onClick={() => {
                  console.log(data);
                  open(<TripModal trip={data as unknown as Partial<Trip>} />, {
                    title: "Chuyến đi mới",
                    actions: (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          type="button"
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
                        >
                          Lưu
                        </Button>
                      </>
                    ),
                  });
                }}
              >
                Tạo mới
              </Button>
            </Box>
          </Stack>
        </Box>
        <Grid container spacing={2}>
          {trips.map((x) => (
            <Grid
              key={x.id}
              size={{
                sm: 1,
                md: 3,
              }}
            >
              <TripCard
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
  );
}
