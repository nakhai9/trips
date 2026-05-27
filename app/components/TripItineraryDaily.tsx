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
  Plus,
  PlusIcon,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";

import BaseModal from "@/libs/components/modal/BaseModal";
import { useState } from "react";
import ActivityForm from "./forms/ActivityForm";
import TripLocationSearch from "./TripLocationSearch";

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

  const [destinations, setDestinations] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const hasActivities = (itinerary.activities?.length ?? 0) > 0;

  const canEditDestination = !hasActivities;

  const handleDestinationChange = (value: { label: string } | null) => {
    // onChange?.({
    //   ...itinerary,
    //   destination: value?.label ?? "",
    // });
    if (!value?.label) return;
    setDestinations((prev) => [...prev, value?.label]);

    setIsEditingDestination(false);
    setShowSearch(false);
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
    <Box>
      {itinerary.activities && itinerary.activities.length > 0 && (
        <Stack direction="column">
          {itinerary.activities?.map((act, index) => (
            <Box key={act.id || index}>
              <Box sx={{ border: "1px solid #ddd", p: 1, borderRadius: 2 }}>
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
                        color: "#444444",

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
                      <Stack direction="row">
                        <IconButton
                          type="button"
                          onClick={() => {
                            setActivityModalOpen(true);

                            setActivityForm(act);
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
                sx={{ borderLeft: "1px dashed #ddd", minHeight: 28, ml: 3 }}
              ></Box>
            </Box>
          ))}

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
        </Stack>
      )}

      <Box
        sx={{
          display: !destinations.length ? "none" : "",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#444444",
            lineHeight: 1.6,
            fontWeight: 600,
            mb: 1,
            textTransform: "uppercase",
          }}
        >
          Địa điểm chính trong ngày
        </Typography>
        <Stack direction="row" spacing={1}>
          {(destinations ?? []).map((d, idx) => (
            <Box
              sx={{
                border: "1px solid #ddd",
                fontSize: 14,
                py: 1,
                px: 1.5,
                borderRadius: "50px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 0.5,
              }}
              key={d + idx}
            >
              <MapPin size={16} />
              {d}
            </Box>
          ))}
          <IconButton
            sx={{
              display: showSearch ? "none" : "",
            }}
            onClick={() => setShowSearch(!showSearch)}
          >
            <PlusIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* {(!destinations.length || showSearch) && (
        <Box
          className="add-destination-section"
          sx={{
            width: {
              xs: "100%",
              md: 400,
            },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "0 auto",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#444444",
              lineHeight: 1.6,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Bạn muốn đi đâu?
          </Typography>

          <TripLocationSearch
            placeholder="Tìm kiếm địa điểm"
            sx={{
              width: {
                xs: "100%",
              },
            }}
            onChange={handleDestinationChange}
          />
        </Box>
      )} */}

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
            color: "#444444",
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

        <>
          <Box
            className="add-destination-section"
            sx={{
              width: {
                xs: "100%",
                md: 400,
              },
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "0 auto",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#444444",
                lineHeight: 1.6,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Bạn muốn đi đâu?
            </Typography>

            <TripLocationSearch
              placeholder="Tìm kiếm địa điểm"
              sx={{
                width: {
                  xs: "100%",
                },
              }}
              onChange={handleDestinationChange}
            />
          </Box>
        </>
      </BaseModal>
    </Box>
  );
}
