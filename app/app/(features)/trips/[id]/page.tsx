"use client";

import RootLayout from "@/components/layout/RootLayout";
import TripItineraryDaily from "@/components/TripItineraryDaily";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { Itinerary, Trip } from "@/types/common";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Lock,
  Settings,
  Share2,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const { trip, fetchTrip } = useFetchTrip();
  const { itineraries, fetchItineraries } = useFetchItineraries();
  const { showError, showSuccess } = useToast();
  const [accessCode, setAccessCode] = useState<string>("");

  const [currentDay, setCurrentDay] = useState<number>(1);

  const [value, setValue] = useState(1);
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
    try {
      fetchTrip(tripID).then((data) => {
        if (data?.canView) {
          fetchItineraries(tripID);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [tripID]);

  const handleSubmitCode = async () => {
    try {
      const data = await fetchTrip(tripID, accessCode);
      if (data?.canView) {
        showSuccess("Mã truy cập hợp lệ");
        await fetchItineraries(tripID);
      }
    } catch (error) {
      showError("Mã truy cập không hợp lệ");
    }
  };

  const selectedItinerary = useMemo(() => {
    return itineraries.find((x) => x.dayNumber === currentDay) || null;
  }, [currentDay, itineraries]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/trips/${tripID}`);
    showSuccess("Đã sao chép đường dẫn");
  };

  return (
    <>
      <RootLayout>
        <Grid container>
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
              <Paper
                elevation={1}
                className="nak-detail-wrapper"
                sx={{
                  my: 4,
                }}
              >
                <Stack direction="column" spacing={2}>
                  <Box className="trip-heading" sx={{ px: 2, py: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ py: 1 }}
                    >
                      <Button
                        variant="text"
                        onClick={() => router.push("/trips")}
                        type="button"
                        startIcon={<ChevronLeft size={20} />}
                        sx={{
                          color: "#334155",
                          textTransform: "capitalize",
                        }}
                      >
                        <Typography variant="subtitle2">Quay lại</Typography>
                      </Button>
                      <Stack
                        direction="row"
                        spacing={0.3}
                        alignItems="center"
                        sx={{
                          display: "inline-flex",
                          backgroundColor: "#ffffff",
                          borderRadius: "50px",
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                          height: "auto",
                        }}
                      >
                        <IconButton
                          aria-label="share"
                          sx={{ color: "#1a2530" }}
                          onClick={copyToClipboard}
                        >
                          <Share2 size={16} />
                        </IconButton>

                        <IconButton aria-label="more" sx={{ color: "#1a2530" }}>
                          <Settings size={16} />
                        </IconButton>
                      </Stack>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
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
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
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
                    </Stack>
                  </Box>

                  <Box
                    className="trip-tabs"
                    sx={{
                      borderTop: "1px solid #ddd",
                      borderBottom: "1px solid #ddd",
                      py: 0.4,
                    }}
                  >
                    <Tabs
                      variant="fullWidth"
                      value={value}
                      onChange={handleChange}
                    >
                      <Tab label="Tổng quan" />
                      <Tab label="Lịch trình" />
                      <Tab label="Bản đồ" />
                    </Tabs>
                  </Box>

                  <Box className="trip-content" sx={{ p: 2, pt: 0 }}>
                    {value === 0 && (
                      <>
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
                      </>
                    )}

                    {value === 1 && trip.canView && (
                      <>
                        <Stack direction="column" spacing={1}>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            className="nak-days-selector-section"
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
                                  fontWeight: 600,
                                  color: "#334155",
                                  lineHeight: 1,
                                  textAlign: "center",
                                }}
                              >
                                NGÀY {currentDay}
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

                          <TripItineraryDaily
                            planId={tripID}
                            dayNumber={currentDay}
                            itinerary={selectedItinerary}
                            afterSubmitForm={async (response) => {
                              if (response) {
                                await fetchItineraries(tripID);
                              }
                            }}
                          />
                        </Stack>
                      </>
                    )}

                    {value === 1 && !trip.canView && (
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 6,
                          px: 3,
                          borderRadius: 3,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2,
                          }}
                        >
                          <Lock size={30} />
                        </Box>
                        <Typography variant="h6" gutterBottom fontWeight={500}>
                          Đây là lịch trình riêng tư
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          Nhập mã truy cập để xem lịch trình này
                        </Typography>

                        <Box sx={{ maxWidth: 360, mx: "auto" }}>
                          <TextField
                            fullWidth
                            label="Mã truy cập"
                            placeholder=""
                            // value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                            size="small"
                            type="password"
                          />

                          <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            onClick={handleSubmitCode}
                            disabled={!accessCode.trim()}
                          >
                            Xác nhận mã truy cập
                          </Button>
                        </Box>
                      </Box>
                    )}

                    {value === 2 && trip.canView && (
                      <>
                        <Box
                          component="div"
                          sx={{
                            width: "100%",
                            height: 400,
                            objectFit: "cover",
                          }}
                        >
                          <TripOpenStreetMapView
                            zoom={13}
                            positions={selectedItinerary?.activities?.map(
                              (x) => {
                                return {
                                  latitude: x.latitude || 0,
                                  longitude: x.longitude || 0,
                                  label: x.addressLine?.split("-")[0],
                                } as PositionItem;
                              },
                            )}
                          />
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 500,
                            color: "#334155",
                            pb: 2,
                            textAlign: "center",
                          }}
                        >
                          Bản đồ các địa điểm trong lịch trình
                        </Typography>
                      </>
                    )}

                    {value === 2 && !trip.canView && (
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 6,
                          px: 3,
                          borderRadius: 3,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2,
                          }}
                        >
                          <Lock size={30} />
                        </Box>
                        <Typography variant="h6" gutterBottom fontWeight={500}>
                          Đây là lịch trình riêng tư
                        </Typography>
                      </Box>
                    )}
                  </Box>
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
