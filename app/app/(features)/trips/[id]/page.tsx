"use client";

import RootLayout from "@/components/layout/RootLayout";
import TripItineraryDaily from "@/components/TripItineraryDaily";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { ResponseId } from "@/types/api";
import { Itinerary, Trip } from "@/types/common";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  NotepadText,
  UsersRound,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
const TripOpenStreetMapView = dynamic(
  () => import("../../../../components/TripOpenStreetMapView"),
  {
    ssr: false,
  },
);
// ================= FETCH HOOKS =================
function useFetchTrip() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useGlobalStore();

  const fetchTrip = useCallback(async (tripID: string) => {
    try {
      setLoading(true);
      setIsLoading(true);
      const data = await HttpClient.get<Trip>(`${API_URLS.plan}/${tripID}`);
      setTrip(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }, []);

  return { trip, loading, error, fetchTrip };
}

function useFetchItineraries() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useGlobalStore();

  const fetchItineraries = useCallback(async (tripID: string) => {
    try {
      setLoading(true);
      setIsLoading(true);
      const res = await HttpClient.get<any>(
        `${API_URLS.itineraries}?planId=${tripID}`,
      );
      setItineraries(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }, []);

  return { itineraries, loading, error, fetchItineraries, setItineraries };
}

export default function TripDetailPage() {
  const params = useParams();
  const tripID = params?.id as string;

  const { trip, loading: tripLoading, fetchTrip } = useFetchTrip();
  const {
    itineraries,
    loading: itineraryLoading,
    fetchItineraries,
    setItineraries,
  } = useFetchItineraries();
  const { showError, showSuccess } = useToast();
  const { setIsLoading } = useGlobalStore();

  const [currentDay, setCurrentDay] = useState<number>(1);

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  // End modal

  useEffect(() => {
    if (!tripID) return;
    fetchTrip(tripID);
    fetchItineraries(tripID);
  }, [tripID]);

  const selectedItinerary = useMemo(() => {
    return itineraries.find((x) => x.dayNumber === currentDay) || null;
  }, [currentDay, itineraries]);

  // ================= LOADING =================
  if (tripLoading) {
    return (
      <RootLayout>
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      </RootLayout>
    );
  }

  const validate = () => {};

  const handleAutoSave = async (itinerary: Itinerary) => {
    setIsLoading(true);
    try {
      console.log(itinerary);

      const { location, activities, ...rest } = itinerary;

      if (itinerary.id) {
        const data = await HttpClient.put<ResponseId>(
          `${API_URLS.itineraries}/${itinerary.id}`,
          {
            ...rest,
          },
        );
      } else {
        const data = await HttpClient.post<ResponseId>(API_URLS.itineraries, {
          ...rest,
        });
      }

      await fetchItineraries(tripID);
      showSuccess("Lưu thành công");
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoDelete = async (event: Itinerary) => {
    try {
      const data = await HttpClient.delete<ResponseId>(
        `${API_URLS.itineraries}/${event.id}`,
      );
      if (data) {
        showSuccess("Đã xóa thành công");
        await fetchItineraries(tripID);
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <RootLayout>
        {trip && (
          <Box sx={{ mt: 4 }}>
            <Stack direction="column" spacing={2}>
              <Paper
                component="div"
                sx={{
                  bgcolor: "#FFFFFF",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: 2,
                      color: "#444444",
                      textAlign: "left",
                    }}
                  >
                    {trip?.title ?? <Skeleton sx={{ maxWidth: 200 }} />}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    mt={1}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarClock size={16} />
                      <Typography variant="body2">
                        {dayjs(trip?.startDate).format("DD/MM/YYYY")} -
                        {dayjs(trip?.endDate).format("DD/MM/YYYY")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <UsersRound size={16} />
                      <Typography variant="body2">x2</Typography>
                    </Stack>
                  </Stack>
                </Box>

                {/* <Box
                  component="div"
                  sx={{
                    width: "100%",
                    height: 250,
                    objectFit: "cover",
                  }}
                >
                  <TripOpenStreetMapView />
                </Box> */}
              </Paper>

              <Grid container spacing={4}>
                <Grid
                  size={{
                    xs: 12,
                    md: 12,
                  }}
                >
                  <Stack direction="column" spacing={2}>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        aria-label="delete"
                        size="small"
                        disabled={currentDay === 1}
                        onClick={() => setCurrentDay(currentDay - 1)}
                      >
                        <ChevronLeft />
                      </IconButton>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#444444",
                          lineHeight: 1.6,
                        }}
                      >
                        NGÀY {currentDay}
                      </Typography>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        disabled={
                          currentDay >=
                          dayjs(trip?.endDate).diff(
                            dayjs(trip?.startDate),
                            "day",
                          )
                        }
                        onClick={() => {
                          setCurrentDay(currentDay + 1);
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </Stack>

                    {/* {itineraries?.map((x, index) => (
                  <TripItineraryDaily key={x.id || index} itinerary={x} />
                // ))} */}

                    {selectedItinerary && (
                      <TripItineraryDaily
                        itinerary={selectedItinerary}
                        onChange={(event) => handleAutoSave(event)}
                        onDelete={(event) => handleAutoDelete(event)}
                      />
                    )}

                    {!selectedItinerary && (
                      <Paper
                        elevation={1}
                        sx={{
                          bgcolor: "#f8fafc",
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <Stack
                          direction="column"
                          spacing={2}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              width: 72,
                              height: 72,
                              borderRadius: 3,
                              bgcolor: "#fff",
                              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.08)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              outline: "none",
                            }}
                          >
                            <NotepadText size={48} />
                          </Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 500,
                              color: "#444444",
                              lineHeight: 1.6,
                            }}
                          >
                            Lên lịch ngay{" | "}
                            <span
                              style={{
                                color: "#0052CB",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setItineraries((prev) => [
                                  ...prev,
                                  {
                                    dayNumber: currentDay,
                                    destination: "",
                                    location: null,
                                    planId: tripID,
                                    activities: [],
                                  },
                                ]);
                              }}
                            >
                              Thêm mới
                            </span>
                          </Typography>
                        </Stack>
                      </Paper>
                    )}
                  </Stack>
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 12,
                  }}
                ></Grid>
              </Grid>
            </Stack>
          </Box>
        )}
      </RootLayout>
    </>
  );
}
