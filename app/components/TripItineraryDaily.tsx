"use client";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import BaseModal from "@/libs/components/modal/BaseModal";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { Itinerary, ItineraryActivity } from "@/types/common";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { CircleX, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import TripLocationSearch from "./TripLocationSearch";
import ActivityForm from "./forms/ActivityForm";

type TripItineraryDailyProps = {
  itinerary: Itinerary;

  onChange?: (itinerary: Itinerary) => void;
  onAddActivity?: (itinerary: Itinerary) => void;
  onDelete?: (itinerary: Itinerary) => void;
};

export default function TripItineraryDaily({
  itinerary,
  onChange,
  onAddActivity,
  onDelete,
}: TripItineraryDailyProps) {
  const { showError } = useToast();
  const [isEditingDestination, setIsEditingDestination] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [activityForm, setActivityForm] = useState<Partial<ItineraryActivity>>(
    {},
  );

  const hasActivities = (itinerary.activities?.length ?? 0) > 0;
  const canEditDestination = !hasActivities;
  const showSearch =
    !itinerary.destination || (isEditingDestination && canEditDestination);

  const handleDestinationChange = (value: { label: string } | null) => {
    onChange?.({
      ...itinerary,
      destination: value?.label ?? "",
    });
    setIsEditingDestination(false);
  };

  const handleAddActivity = () => {
    setActivityForm({
      description: "",
      startTime: "",
      endTime: "",
      addressLine: "",
      isCompleted: false,
    });
    setActivityModalOpen(true);
  };

  const handleActivityFormChange = (form: Partial<ItineraryActivity>) => {
    setActivityForm(form);
  };

  const handleActivityFormSubmit = async () => {
    const newActivity: ItineraryActivity = {
      ...activityForm,
      sequence: (itinerary.activities?.length ?? 0) + 1,
      itineraryId: itinerary.id,
    } as ItineraryActivity;

    validate(newActivity);

    try {
      // Gọi API tạo hoạt động mới
      const created = await HttpClient.post<ItineraryActivity>(
        API_URLS.activities,
        newActivity,
      );
      const updated: Itinerary = {
        ...itinerary,
        activities: [...(itinerary.activities ?? []), created],
      };
      setActivityModalOpen(false);
    } catch (err: any) {
      showError(err?.message || "Không thể thêm hoạt động");
    }
  };

  const handleDeleteSchedule = () => {
    onDelete?.(itinerary);
  };

  const validate = (activity: ItineraryActivity) => {
    if (!activity.description) {
      showError("Thêm mô tả cho hoạt động");
    }
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 1,
          bgcolor: "#fff",
          height: "100%",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          {showSearch ? (
            <TripLocationSearch
              placeholder="Thêm địa điểm"
              sx={{ width: 400 }}
              onChange={handleDestinationChange}
            />
          ) : (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              onClick={
                canEditDestination
                  ? () => setIsEditingDestination(true)
                  : undefined
              }
              sx={{
                cursor: canEditDestination ? "pointer" : "default",
                borderRadius: 1,
                px: 0.5,
                py: 0.25,
                ...(canEditDestination && {
                  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                }),
              }}
            >
              <MapPin />
              <Typography
                component="span"
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  letterSpacing: 2,
                  color: "#444444",
                }}
              >
                {itinerary.destination || itinerary.location?.name}
              </Typography>
            </Stack>
          )}

          {
            <Stack direction="row" spacing={1} alignItems="center">
              {itinerary.destination && !isEditingDestination && (
                <Tooltip title="Thêm hoạt động">
                  <IconButton
                    size="small"
                    onClick={handleAddActivity}
                    sx={{
                      bgcolor: "rgba(0,0,0,0.04)",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                    }}
                  >
                    <Plus size={18} />
                  </IconButton>
                </Tooltip>
              )}

              {!isEditingDestination && (
                <Tooltip title="Xóa lịch trình">
                  <IconButton
                    size="small"
                    onClick={handleDeleteSchedule}
                    sx={{
                      color: "#d32f2f",
                      bgcolor: "rgba(211,47,47,0.08)",
                      "&:hover": { bgcolor: "rgba(211,47,47,0.16)" },
                    }}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Tooltip>
              )}

              {isEditingDestination && (
                <Tooltip title="Lưu">
                  <IconButton
                    size="small"
                    onClick={() => setIsEditingDestination(false)}
                  >
                    <CircleX size={18} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          }
        </Stack>

        <Box sx={{ mt: 2, maxHeight: 400, overflowY: "scroll" }}>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
          >
            {itinerary.activities && itinerary.activities?.length > 0 ? (
              itinerary.activities?.map((act, index) => (
                // <Box
                //   key={act.id || index}
                //   sx={{
                //     display: "flex",
                //     gap: 2,
                //   }}
                // >
                //   <Box
                //     sx={{
                //       minWidth: "50px",
                //       py: 1,
                //       borderRadius: "14px",
                //       color: "#444444",
                //       fontWeight: 700,
                //       fontSize: "14px",
                //       height: "fit-content",
                //     }}
                //   >
                //     {act.startTime || "-- : --"}
                //   </Box>

                //   <Box sx={{ flex: 1 }}>
                //     <Typography
                //       sx={{
                //         mt: 1,
                //         fontSize: "14px",
                //         color: "#444444",
                //         lineHeight: 1.6,
                //       }}
                //     >
                //       {act.description}
                //     </Typography>
                //     {act.addressLine && (
                //       <Stack
                //         direction="row"
                //         alignItems="center"
                //         sx={{
                //           display: "none",
                //         }}
                //       >
                //         <Stack direction="row" alignItems="center" spacing={0.5}>
                //           <MapPin size={12} />
                //           <Typography
                //             component="span"
                //             sx={{
                //               fontSize: 12,
                //             }}
                //           >
                //             {act.addressLine}
                //           </Typography>
                //         </Stack>
                //       </Stack>
                //     )}
                //   </Box>
                //   <Stack justifyItems="flex-end">
                //     <Box>
                //       <Tooltip title="Xóa lịch trình">
                //         <IconButton
                //           size="small"
                //           onClick={handleDeleteSchedule}
                //           sx={{
                //             bgcolor: "rgba(211,47,47,0.08)",
                //             "&:hover": { bgcolor: "rgba(211,47,47,0.16)" },
                //           }}
                //         >
                //           <Minus size={14} />
                //         </IconButton>
                //       </Tooltip>
                //     </Box>
                //   </Stack>
                // </Box>

                <TimelineItem key={act.id || index}>
                  <TimelineOppositeContent
                    sx={{
                      flex: "0 0 100px",
                      maxWidth: "80px",
                    }}
                  >
                    {act.startTime}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{ bgcolor: act.isCompleted ? "#e35c35" : "" }}
                    />
                    <TimelineConnector
                      sx={{ bgcolor: act.isCompleted ? "#e35c35" : "" }}
                    />
                  </TimelineSeparator>
                  <TimelineContent>{act.description}</TimelineContent>
                </TimelineItem>
              ))
            ) : (
              <Stack
                direction="column"
                spacing={1.5}
                alignItems="center"
                justifyContent="center"
                sx={{
                  py: 6,
                  px: 2,
                  textAlign: "center",
                  bgcolor: "#f8fafc",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6b7280",
                    maxWidth: 320,
                    lineHeight: 1.6,
                  }}
                >
                  Bắt đầu xây dựng lịch trình bằng cách thêm hoạt động đầu tiên
                  cho chuyến đi
                </Typography>
              </Stack>
            )}
          </Timeline>
        </Box>
      </Paper>
      <BaseModal
        open={activityModalOpen}
        onClose={() => setActivityModalOpen(false)}
        title="Thêm hoạt động mới"
        actions={
          <>
            <Button onClick={() => setActivityModalOpen(false)}>Hủy</Button>
            <Button
              variant="contained"
              onClick={handleActivityFormSubmit}
              disabled={!activityForm.description}
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
            >
              Thêm
            </Button>
          </>
        }
      >
        <ActivityForm
          initial={activityForm}
          onChange={handleActivityFormChange}
        />
      </BaseModal>
    </>
  );
}
