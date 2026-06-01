"use client";

import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { Itinerary, ItineraryActivity } from "@/types/common";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import {
  BadgeCheck,
  MapPin,
  Pen,
  Plane,
  Plus,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";

import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import ActivityForm from "./forms/ActivityForm";
import ItineraryForm from "./forms/ItineraryForm";

type ActionAfterSubmitForm = {
  name: string;
  success: boolean;
};

type TripItineraryDailyProps = {
  itinerary: Itinerary | null;
  dayNumber: number;
  planId: string;
  onChange?: (itinerary: Itinerary) => void;
  onAddActivity?: (itinerary: Itinerary) => void;
  onDelete?: (itinerary: Itinerary) => void;
  afterSubmitForm?: (action: ActionAfterSubmitForm) => void;
};

export default function TripItineraryDaily({
  dayNumber,
  itinerary,
  planId,
  onChange,
  onDelete,
  afterSubmitForm,
}: TripItineraryDailyProps) {
  const { showSuccess, showError } = useToast();
  const { setIsLoading } = useGlobalStore();
  const { openBdm } = useBaseDynamicModal();

  const handleDeleteActivity = async (activity: ItineraryActivity) => {
    try {
      setIsLoading(true);

      await HttpClient.delete(`${API_URLS.activities}/${activity.id}`);

      afterSubmitForm?.({ name: "activity", success: true });
    } catch (err: any) {
      showError(err?.message || "Không thể xóa hoạt động");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {itinerary?.destinations && (
        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "#334155",
                maxWidth: 320,
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              ĐỊA ĐIỂM CHÍNH TRONG NGÀY
            </Typography>
            <IconButton
              type="button"
              onClick={async () => {
                const form = await openBdm(<ItineraryForm />, {
                  title: "Kê hoạch ngày " + dayNumber,
                  formData: {
                    ...itinerary,
                  },
                  onSuccess: (success) => {
                    if (!success) return;
                    afterSubmitForm?.({ name: "itinerary", success: true });
                  },
                });
              }}
            >
              <Pen size={14} />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {itinerary?.destinations?.split(",").map((d, idx) => (
              <Box
                key={d.trim() + idx}
                sx={{
                  border: "1px solid #334155",
                  borderRadius: 5,
                  px: 2,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: 12,
                  color: "#334155",
                }}
              >
                <MapPin size={14} /> {d.trim()}
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {itinerary?.activities && itinerary.activities.length > 0 && (
        <Stack direction="column" mt={3}>
          {itinerary.activities?.map((act, index) => (
            <Box key={act.id || index}>
              <Box sx={{ border: "1px solid #334155", p: 1, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    component="div"
                    sx={{
                      maxWidth: 56,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#2068f7",
                        fontWeight: 600,
                        lineHeight: 1.6,
                      }}
                    >
                      {act.startTime}
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#334155",

                        lineHeight: 1.6,
                      }}
                    >
                      {act.title}
                    </Typography>

                    {act.isCompleted ? (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <BadgeCheck
                          strokeWidth={2}
                          absoluteStrokeWidth
                          size={16}
                          stroke="green"
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "green",

                            lineHeight: 1.6,
                          }}
                        >
                          Hoàn thành
                        </Typography>
                      </Stack>
                    ) : (
                      <Stack direction="row">
                        <IconButton
                          type="button"
                          onClick={async () => {
                            const formData = await openBdm(
                              <ActivityForm />,

                              {
                                title: "Hoạt động",
                                formData: {
                                  id: act?.id,
                                },
                                onSuccess: (success) => {
                                  if (!success) return;
                                  afterSubmitForm?.({
                                    name: "activity",
                                    success: true,
                                  });
                                },
                              },
                            );
                          }}
                          sx={{
                            "&:hover": {
                              bgcolor: "#f1f5f9",
                            },
                          }}
                        >
                          <SquareArrowOutUpRight size={15} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteActivity(act)}
                          sx={{
                            color: "#d32f2f",
                            "&:hover": {
                              bgcolor: "rgba(211,47,47,0.16)",
                            },
                          }}
                        >
                          <Trash2 size={15} />
                        </IconButton>
                      </Stack>
                    )}
                  </Box>
                </Stack>
              </Box>
              <Box
                className="activity-connector"
                sx={{
                  borderLeft: `2px dashed ${act.isCompleted ? "#e35c35" : "#334155"}`,
                  minHeight: 28,
                  ml: 3,
                }}
              ></Box>
            </Box>
          ))}

          <Button
            size="small"
            sx={{
              borderColor: "#e35c35",
              color: "#e35c35",
              fontWeight: 500,

              px: 4,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              background: "#fff",
              "&:hover": {
                borderColor: "#c94e2d",
                background: "#fbeee7",
              },
            }}
            startIcon={<Plus size={18} />}
            variant="outlined"
            onClick={async () => {
              const formData = await openBdm(
                <ActivityForm />,

                {
                  title: "Hoạt động",
                  formData: {
                    itineraryId: itinerary?.id,
                  },
                  onSuccess: (success) => {
                    if (!success) return;
                    afterSubmitForm?.({ name: "activity", success: true });
                  },
                },
              );
            }}
          >
            <span>Thêm hoạt động</span>
          </Button>
        </Stack>
      )}

      {itinerary?.activities && !itinerary.activities.length && (
        <Box
          sx={{
            backgroundColor: "",
            px: 2,
            py: 5,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mt: 2,
            border: "1px dashed #e35c35",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#334155",
              maxWidth: 320,
              lineHeight: 1.6,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Bắt đầu xây dựng lịch trình bằng cách thêm hoạt động đầu tiên cho
            chuyến đi
          </Typography>

          <Button
            size="small"
            onClick={async () => {
              const formData = await openBdm(
                <ActivityForm />,

                {
                  title: "Hoạt động",
                  formData: {
                    itineraryId: itinerary?.id,
                  },
                  onSuccess: (success) => {
                    if (!success) return;
                    afterSubmitForm?.({ name: "activity", success: true });
                  },
                },
              );
            }}
            sx={{
              borderColor: "#e35c35",
              color: "#e35c35",
              fontWeight: 500,

              px: 4,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              background: "#fff",
              "&:hover": {
                borderColor: "#c94e2d",
                background: "#fbeee7",
              },
            }}
            startIcon={<Plus size={18} />}
            variant="outlined"
          >
            <span>Thêm hoạt động</span>
          </Button>
        </Box>
      )}

      {!(itinerary?.destinations?.split(",") || []).length && (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Box
            alt="Trip 2"
            sx={{ width: "200px", height: "200px", objectFit: "cover" }}
            component="img"
            src="https://img.magnific.com/free-vector/inside-country-traveling-abstract-concept-illustration_335657-3912.jpg?semt=ais_hybrid&w=740&q=80"
          />
          <Typography
            variant="body2"
            sx={{
              color: "#334155",
              lineHeight: 1.6,
              fontWeight: 600,
              mb: 1,
              textTransform: "",
            }}
          >
            Hãy chọn địa điểm cho ngày hôm nay
          </Typography>
          <Button
            type="button"
            size="small"
            onClick={async () => {
              openBdm(<ItineraryForm />, {
                title: "Kế hoạch ngày " + dayNumber,
                // hideHeader: true,
                formData: {
                  dayNumber: dayNumber,
                  ...itinerary,
                  planId: planId,
                },
              });
            }}
            sx={{
              background: "#e35c35",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "50px",
              px: 4,
              py: 1,
              borderColor: "#e35c35",
              textTransform: "none",
              boxShadow: "0 2px 12px #e35c3530",
              "&:hover": { background: "#c94e2d" },
            }}
            startIcon={<Plane size={18} />}
            variant="outlined"
          >
            <span>Lập kế hoạch chuyến đi</span>
          </Button>
        </Stack>
      )}
    </Box>
  );
}
