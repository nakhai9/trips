"use client";

import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { Itinerary, ItineraryActivity } from "@/types/common";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { BadgeCheck, Plus, SquareArrowOutUpRight, Trash2 } from "lucide-react";

import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import { BaseModalConfig } from "@/libs/components/modal/BaseModalStore";
import { ResponseId } from "@/types/api";
import { useState } from "react";
import ActivityForm from "./forms/ActivityForm";
import DestinationForm from "./forms/DestinationForm";

type TripItineraryDailyProps = {
  itinerary: Itinerary | null;

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
  const { showSuccess, showError } = useToast();
  const { setIsLoading } = useGlobalStore();
  const { openBdm } = useBaseDynamicModal();

  const [isEditingDestination, setIsEditingDestination] = useState(false);

  const [activityModalOpen, setActivityModalOpen] = useState(false);

  const [editingActivity, setEditingActivity] =
    useState<ItineraryActivity | null>(null);

  const [activityForm, setActivityForm] = useState<Partial<ItineraryActivity>>(
    {},
  );

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const hasActivities = (itinerary?.activities?.length ?? 0) > 0;

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
          sequence: (itinerary?.activities?.length ?? 0) + 1,
          itineraryId: itinerary?.id,
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
    if (!itinerary) return;
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

  const handleOpenModal = (modalConfig: BaseModalConfig) => {
    // open(modalConfig);
  };

  const handleSaveDestinationOfDay = async (itinerary: Itinerary) => {
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
      showSuccess("Lưu thành công");
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {itinerary?.activities && itinerary.activities.length > 0 && (
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
                        color: "#334155",

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
              <ActivityForm
                initial={activityForm}
                onChange={handleActivityFormChange}
              />,

              {
                title: "Thêm hoạt động",
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
            const formData = await openBdm(<DestinationForm />, {
              title: "AAAA",
              hideHeader: true,

              actions: [
                {
                  type: "submit",
                  text: "Lưu",
                },
              ],
            });

            console.log(formData);
          }}
          sx={{
            background: "#e35c35",
            color: "#fff",
            fontWeight: 500,
            borderRadius: "50px",
            px: 4,
            py: 1,
            borderColor: "#e35c35",
            textTransform: "none",
            boxShadow: "0 2px 12px #e35c3530",
            "&:hover": { background: "#c94e2d" },
          }}
          startIcon={<Plus size={18} />}
          variant="outlined"
        >
          <span>Thêm địa điểm</span>
        </Button>
      </Stack>
    </Box>
  );
}
