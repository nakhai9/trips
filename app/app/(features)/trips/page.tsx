"use client";

import TripForm from "@/components/forms/TripForm";
import RootLayout from "@/components/layout/RootLayout";
import TripsCard from "@/components/ui/TripsCard";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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
  const { openBdm } = useBaseDynamicModal();
  const { showSuccess, showError } = useToast();

  const handleOpenModal = async () => {
    await openBdm(<TripForm />, {
      title: "Kế hoạch",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await HttpClient.delete(`${API_URLS.plan}/${id}`);
      showSuccess("Xóa thành công");
    } catch (error) {
      showError(error);
    } finally {
      await onLoadTrips();
    }
  };

  useEffect(() => {
    onLoadTrips();
  }, []);

  return (
    <>
      <RootLayout>
        <Stack direction="column" spacing={2}>
          <Stack
            direction="column"
            alignItems="center"
            spacing={1}
            sx={{ py: 4 }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#334155",
                fontWeight: 500,
                letterSpacing: 1.2,
                textAlign: "center",
              }}
            >
              Bắt đầu từ một ý tưởng có sẵn
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#334155",
                fontWeight: 500,
                letterSpacing: 1.2,
                textAlign: "center",
              }}
            >
              hoặc
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                onClick={handleOpenModal}
              >
                Tạo hành trình mới cho riêng bạn
              </Button>
            </Box>
          </Stack>

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
                  viewCount={x.viewCount}
                  delFn={() => handleDelete(x.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </RootLayout>
    </>
  );
}
