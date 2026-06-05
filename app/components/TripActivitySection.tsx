import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { ItineraryActivity } from "@/types/common";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { BadgeCheck, Plus, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import ActivityForm from "./forms/ActivityForm";

type TripActivitySectionProps = {
  itineraryId: string;
  activities: ItineraryActivity[];
};
export default function TripActivitySection({
  itineraryId,
  activities = [],
}: TripActivitySectionProps) {
  const { openBdm, setModalEvent } = useBaseDynamicModal();
  const { showError } = useToast();
  const handleDeleteActivity = async (activity: ItineraryActivity) => {
    try {
      await HttpClient.delete(`${API_URLS.activities}/${activity.id}`);

      setModalEvent({
        type: "resolve",
        name: "activity",
        payload: { action: "delete", id: activity.id },
      });
    } catch (err: any) {
      showError(err?.message || "Không thể xóa hoạt động");
    }
  };
  return (
    <>
      {activities.length > 0 && (
        <Stack direction="column" mt={2} spacing={2}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#334155",
              maxWidth: 320,
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            HOẠT ĐỘNG TRONG NGÀY
          </Typography>
          <Box>
            {activities?.map((act, index) => (
              <Box key={act.id || index}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box component="div">
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#334155",
                          fontWeight: 600,
                          lineHeight: 1.6,
                        }}
                      >
                        {act.startTime ? act.startTime : "-- : --"}
                      </Typography>
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
                                    //   afterSubmitForm?.({
                                    //     name: "activity",
                                    //     success: true,
                                    //   });
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
                    borderLeft: `2px dashed ${act.isCompleted ? "#e35c35" : "#90a1b9"}`,
                    minHeight: 28,
                    ml: 3,
                  }}
                ></Box>
              </Box>
            ))}
            <Button
              size="small"
              variant="contained"
              startIcon={<Plus size={18} />}
              sx={{
                background: "#e35c35",
                width: "100%",

                textTransform: "none",
                "&:hover": { background: "#c94e2d" },
              }}
              onClick={async () => {
                const formData = await openBdm(
                  <ActivityForm />,

                  {
                    title: "Hoạt động",
                    formData: {
                      itineraryId,
                    },
                    onSuccess: (success) => {
                      if (!success) return;
                      // afterSubmitForm?.({ name: "activity", success: true });
                    },
                  },
                );
              }}
            >
              <span>Thêm hoạt động</span>
            </Button>
          </Box>
        </Stack>
      )}

      {activities && !activities.length && (
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
                    itineraryId,
                  },
                  onSuccess: (success) => {
                    if (!success) return;
                    // afterSubmitForm?.({ name: "activity", success: true });
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
    </>
  );
}
