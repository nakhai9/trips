"use client";

import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import BaseModal from "@/libs/components/modal/BaseModal";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { Itinerary, ItineraryActivity } from "@/types/common";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { BadgeCheck, CircleX, Eye, MapPin, Plus, Trash2 } from "lucide-react";

import { useState } from "react";

import TripLocationSearch from "./TripLocationSearch";
import ActivityForm from "./forms/ActivityForm";

type TripItineraryDailyProps = {
  itinerary: Itinerary;

  onChange?: (itinerary: Itinerary) => void;
  onAddActivity?: (itinerary: Itinerary) => void;
  onDelete?: (itinerary: Itinerary) => void;
  afterSubmitActivityForm?: (response: boolean) => void;
};

export default function TripItineraryDaily({
  itinerary,
  onChange,
  onDelete,
  afterSubmitActivityForm,
}: TripItineraryDailyProps) {
  const { showError } = useToast();
  const { setIsLoading } = useGlobalStore();

  const [isEditingDestination, setIsEditingDestination] = useState(false);

  const [activityModalOpen, setActivityModalOpen] = useState(false);

  const [editingActivity, setEditingActivity] =
    useState<ItineraryActivity | null>(null);

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
    setEditingActivity(null);

    setActivityForm({
      description: "",
      startTime: "",
      endTime: "",
      addressLine: "",
      isCompleted: false,
    });

    setActivityModalOpen(true);
  };

  const handleEditActivity = (activity: ItineraryActivity) => {
    setEditingActivity(activity);

    setActivityForm({
      ...activity,
    });

    setActivityModalOpen(true);
  };

  const handleActivityFormChange = (form: Partial<ItineraryActivity>) => {
    setActivityForm(form);
  };

  const validate = (activity: ItineraryActivity) => {
    if (!activity.description) {
      throw new Error("Thêm mô tả cho hoạt động");
    }
  };

  const handleActivityFormSubmit = async () => {
    try {
      setIsLoading(true);

      // UPDATE
      if (editingActivity?.id) {
        const updatedActivity: ItineraryActivity = {
          ...editingActivity,
          ...activityForm,
        };

        validate(updatedActivity);

        await HttpClient.put(
          `${API_URLS.activities}/${editingActivity.id}`,
          updatedActivity,
        );
      }

      // CREATE
      else {
        const newActivity: ItineraryActivity = {
          ...activityForm,
          sequence: (itinerary.activities?.length ?? 0) + 1,
          itineraryId: itinerary.id,
        } as ItineraryActivity;

        validate(newActivity);

        await HttpClient.post<ItineraryActivity>(
          API_URLS.activities,
          newActivity,
        );
      }

      setActivityModalOpen(false);
      setEditingActivity(null);

      afterSubmitActivityForm?.(true);
    } catch (err: any) {
      showError(err?.message || "Không thể lưu hoạt động");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSchedule = () => {
    onDelete?.(itinerary);
  };

  const handleDeleteActivity = async (activity: ItineraryActivity) => {
    try {
      setIsLoading(true);

      await HttpClient.delete(`${API_URLS.activities}/${activity.id}`);

      afterSubmitActivityForm?.(true);
    } catch (err: any) {
      showError(err?.message || "Không thể xóa hoạt động");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          px: 2,
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
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.04)",
                  },
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

          <Stack direction="row" spacing={1} alignItems="center">
            {!isEditingDestination && (
              <Tooltip title="Xóa lịch trình">
                <IconButton
                  size="small"
                  onClick={handleDeleteSchedule}
                  sx={{
                    color: "#d32f2f",
                    bgcolor: "rgba(211,47,47,0.08)",
                    "&:hover": {
                      bgcolor: "rgba(211,47,47,0.16)",
                    },
                  }}
                >
                  <Trash2 size={18} />
                </IconButton>
              </Tooltip>
            )}

            {isEditingDestination && (
              <Tooltip title="Đóng">
                <IconButton
                  size="small"
                  onClick={() => setIsEditingDestination(false)}
                >
                  <CircleX size={18} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>

        <Box
          sx={{
            mt: 2,
            p: 0,
            px: 1,
            maxHeight: 400,
            overflowY: "auto",
          }}
        >
          {itinerary.activities && itinerary.activities.length > 0 ? (
            <Stack direction="column" spacing={1}>
              {itinerary.destination && !isEditingDestination && (
                <Tooltip title="Thêm hoạt động">
                  <Button
                    size="small"
                    onClick={handleAddActivity}
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
                </Tooltip>
              )}
              {itinerary.activities?.map((act, index) => (
                <Paper
                  key={act.id || index}
                  elevation={2}
                  sx={{
                    p: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                      component="div"
                      sx={{
                        width: 56,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
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
                          color: "#6b7280",

                          lineHeight: 1.6,
                        }}
                      >
                        {act.description}
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
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            type="button"
                            onClick={() => {
                              setActivityModalOpen(true);

                              setActivityForm(act);
                            }}
                          >
                            <Eye size={12} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteActivity(act)}
                            sx={{
                              color: "#d32f2f",
                              bgcolor: "rgba(211,47,47,0.08)",
                              "&:hover": {
                                bgcolor: "rgba(211,47,47,0.16)",
                              },
                            }}
                          >
                            <Trash2 size={12} />
                          </IconButton>
                        </Stack>
                      )}
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
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
        </Box>
      </Box>

      <BaseModal
        open={activityModalOpen}
        onClose={() => {
          setActivityModalOpen(false);
          setEditingActivity(null);
        }}
        title={editingActivity ? "Chỉnh sửa hoạt động" : "Thêm hoạt động mới"}
        actions={
          <>
            <Button
              onClick={() => {
                setActivityModalOpen(false);
                setEditingActivity(null);
              }}
            >
              Hủy
            </Button>

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
                "&:hover": {
                  background: "#c94e2d",
                },
              }}
            >
              {editingActivity ? "Cập nhật" : "Thêm"}
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
