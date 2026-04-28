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
import { ResponseId } from "@/types/api";
import { Trip } from "@/types/common";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

type TripModalProps = {};

function TripModal({}: TripModalProps) {
  const { set, params } = useBaseModalStore();
  return (
    <Stack spacing={3}>
      <BaseInput
        label="Tên hành trình"
        value={(params as unknown as Partial<Trip>)?.title || ""}
        size="small"
        onChange={(e) =>
          set<Partial<Trip>>({
            ...(params as unknown as Partial<Trip>),
            title: e.target.value,
          })
        }
      />

      <TripsDateRangePicker
        from={dayjs((params as unknown as Partial<Trip>).startDate)}
        to={dayjs((params as unknown as Partial<Trip>).endDate)}
        onDateChange={({ from, to }) =>
          set({
            title: (params as unknown as Partial<Trip>).title,
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

      const params = await HttpClient.get<any>(API_URLS.plan);

      setTrips(params);
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

  const { params, isOpen, open, set } = useBaseModalStore();

  const handleSave = async () => {
    try {
      const modalParams = params as unknown as Partial<Trip>;
      console.log(modalParams);
      if (!modalParams.title) {
        showError("Bạn chưa đặt tên cho lịch trình");
        return;
      }

      const payload = {
        title: modalParams.title,
        description: "tripparams.description",
        isPublic: true,
        accessCode: null,
        startDate: dayjs(modalParams.startDate).toISOString(),
        endDate: dayjs(modalParams.endDate).toISOString(),
      };
      console.log(payload);
      const result = await HttpClient.post<ResponseId>(API_URLS.plan, payload);
      if (result.id) {
        onLoadTrips();
      }

      showSuccess("Tạo hành trình thành công");
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  useEffect(() => {
    onLoadTrips();
  }, []);

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
                  const initParams = {
                    title: "",
                    description: "",
                    startDate: dayjs().add(1, "day"),
                    endDate: dayjs().add(2, "day"),
                    accessCode: "",
                    isPrivate: false,
                  };

                  set(initParams);

                  open(<TripModal />, {
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
