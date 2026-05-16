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
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
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
import QRCode from "qrcode";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PositionItem } from "../../../../components/TripOpenStreetMapView";
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

  const [value, setValue] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getQrCodeUrl = async (id: string) => {
    return await QRCode.toDataURL(`${window.location.origin}/trips/${id}`);
  };

  const genQRCode = async (id: string) => {
    const url = await getQrCodeUrl(id);
    setQrCodeUrl(url);
  };

  useEffect(() => {
    if (!tripID) return;
    genQRCode(tripID);
    fetchTrip(tripID);
    fetchItineraries(tripID);
  }, [tripID]);

  const selectedItinerary = useMemo(() => {
    return itineraries.find((x) => x.dayNumber === currentDay) || null;
  }, [currentDay, itineraries]);

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
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 2,
            }}
          ></Grid>
          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            {trip && (
              <Paper sx={{ mt: 4 }}>
                <Box sx={{ px: 3, py: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: 1,
                      color: "#e35c35",
                      textAlign: "left",
                      fontFamily: "Playfair Display, sans-serif",
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
                <Tabs variant="fullWidth" value={value} onChange={handleChange}>
                  <Tab label="Tổng quan" />
                  <Tab label="Lịch trình" />
                </Tabs>
                <Stack direction="column" spacing={2}>
                  {value === 0 && (
                    <>
                      <Box
                        sx={{
                          p: 2,
                        }}
                      >
                        <Stack alignItems="center" direction="column">
                          <Box
                            component="img"
                            src={qrCodeUrl}
                            alt="qr"
                            sx={{
                              width: { xs: 150, md: 200, lg: 250 },
                              height: { xs: 150, md: 200, lg: 250 },
                            }}
                          />
                          <Typography variant="caption">
                            Quét mã QR để xem chi tiết
                          </Typography>
                        </Stack>
                      </Box>
                    </>
                  )}

                  {value === 1 && trip.canView && (
                    <>
                      <Box
                        component="div"
                        sx={{
                          width: "100%",
                          height: 250,
                          objectFit: "cover",
                        }}
                      >
                        <TripOpenStreetMapView
                          zoom={13}
                          positions={selectedItinerary?.activities?.map((x) => {
                            return {
                              latitude: x.latitude || 0,
                              longitude: x.longitude || 0,
                              label: x.addressLine?.split("-")[0],
                            } as PositionItem;
                          })}
                        />
                      </Box>
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
                            sx={{
                              cursor: currentDay === 1 ? "not-allowed" : "",
                            }}
                          >
                            <ChevronLeft />
                          </IconButton>
                          <Stack direction="column" spacing={1}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 500,
                                color: "#444444",
                                lineHeight: 1,
                                textAlign: "center",
                              }}
                            >
                              NGÀY {currentDay}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: "#444444",
                                lineHeight: 1,
                                textAlign: "center",
                              }}
                            >
                              {selectedItinerary?.destination}
                            </Typography>
                          </Stack>
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
                            sx={{
                              cursor:
                                currentDay >=
                                dayjs(trip?.endDate).diff(
                                  dayjs(trip?.startDate),
                                  "day",
                                )
                                  ? "not-allowed"
                                  : "",
                            }}
                            onClick={() => {
                              setCurrentDay(currentDay + 1);
                            }}
                          >
                            <ChevronRight />
                          </IconButton>
                        </Stack>

                        {selectedItinerary && (
                          <TripItineraryDaily
                            itinerary={selectedItinerary}
                            onChange={(event) => handleAutoSave(event)}
                            onDelete={(event) => handleAutoDelete(event)}
                            afterSubmitActivityForm={async (response) => {
                              if (response) {
                                await fetchItineraries(tripID);
                              }
                            }}
                          />
                        )}

                        {!selectedItinerary && (
                          <Box
                            sx={{
                              bgcolor: "#f8fafc",
                              borderRadius: 2,
                              p: 2,
                              mt: 1,
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
                                  boxShadow:
                                    "0 4px 16px rgba(15, 23, 42, 0.08)",
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
                          </Box>
                        )}
                      </Stack>
                    </>
                  )}
                </Stack>
              </Paper>
            )}
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 2,
            }}
          ></Grid>
        </Grid>
      </RootLayout>
    </>
  );
}
