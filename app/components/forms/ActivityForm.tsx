"use client";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import BaseModalBody from "@/libs/components/modal/BaseModalBody";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { ItineraryActivity } from "@/types/common";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { MapPin, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import TripLocationSearch from "../TripLocationSearch";
import { PositionItem } from "../TripOpenStreetMapView";
import TripsTimeRangePicker, {
  TripsTimeRangePickerEvent,
} from "../ui/TripsTimeRangePicker";
const TripOpenStreetMapView = dynamic(
  () => import("../TripOpenStreetMapView"),
  {
    ssr: false,
  },
);

function useFetchActivityByDay() {
  const [activity, setActivity] = useState<ItineraryActivity | null>(null);
  const [loading, setLoading] = useState(false);
  const { showError } = useToast();
  const { setIsLoading } = useGlobalStore();
  const fetchActivity = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const res = await HttpClient.get<ItineraryActivity>(
        `${API_URLS.activities}/${id}`,
      );
      if (res) {
        setActivity(res);
      }
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { fetchActivity, activity, loading };
}

export type ActivityFormProps = {};

export default function ActivityForm({}: ActivityFormProps) {
  const { config, closeBdm } = useBaseDynamicModal();
  const { showError, showSuccess } = useToast();
  const { setIsLoading } = useGlobalStore();
  const { fetchActivity, activity } = useFetchActivityByDay();
  const [form, setForm] = useState<Partial<ItineraryActivity> | null>({
    title: "",
    description: "",
    endTime: "",
    startTime: "",
    sequence: 0,
    itineraryId: config?.formData?.itineraryId || "",
    isCompleted: false,
    addressLine: null,
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (field: keyof ItineraryActivity, value: any) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
  };

  const handleTimeChange = (e: TripsTimeRangePickerEvent) => {
    const updated = {
      ...form,
      startTime: e.from || "",
      endTime: e.to || "",
    };
    setForm(updated);
  };

  const handleSubmit = async () => {
    closeBdm();
    const payload = {
      ...form,
    };
    setIsLoading(true);
    try {
      if (form?.id) {
        // update
        const res = await HttpClient.put(
          `${API_URLS.activities}/${form.id}`,
          payload,
        );
      } else {
        const res = await HttpClient.post(`${API_URLS.activities}`, payload);
      }

      showSuccess(
        `Hoạt động đã được ${form?.id ? "cập nhật" : "tạo"} thành công!`,
      );
      config?.onSuccess?.(true);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!config?.formData?.id) return;
    console.log("Fetching activity with id:", config.formData.id);
    fetchActivity(config.formData.id);
  }, [config?.formData?.id]);

  useEffect(() => {
    if (!activity) return;
    console.log("Fetched activity:", activity);
    setForm({ ...form, ...activity });
  }, [activity]);

  return (
    <BaseModalBody
      actions={
        <>
          <Button
            variant="outlined"
            onClick={closeBdm}
            sx={{
              textTransform: "none",

              px: 2,
              py: 0.5,
              borderColor: "#ddd",
              color: "#111827",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background: "#e35c35",
              textTransform: "none",
              "&:hover": { background: "#c94e2d" },
            }}
          >
            Lưu
          </Button>
        </>
      }
    >
      <Box component="form" sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <TextField
            label="Hoạt động "
            value={form?.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Mô tả, ghi chú"
            value={form?.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            size="small"
            multiline
            rows={4}
          />
          <TripsTimeRangePicker
            from={form?.startTime ? form.startTime : undefined}
            to={form?.endTime ? form.endTime : undefined}
            toTitle="Kết thúc"
            fromTitle="Bắt đầu"
            onTimeChange={handleTimeChange}
          />
          {/* <TextField
          label="Địa chỉ"
          value={form.addressLine}
          onChange={(e) => handleChange("addressLine", e.target.value)}
          fullWidth
          size="small"
        /> */}
          {form?.id && (
            <FormControlLabel
              control={
                <Switch
                  checked={!!form.isCompleted}
                  onChange={(e) =>
                    handleChange("isCompleted", e.target.checked)
                  }
                />
              }
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#e35c35",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#e35c35",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#ccc",
                },
              }}
              label="Hoàn thành"
            />
          )}
          <Box>
            {!form?.addressLine && (
              <TripLocationSearch
                placeholder="Thêm địa chỉ chi tiết"
                onChange={(value) => {
                  if (!value) return;
                  const updated = {
                    ...form,
                    addressLine: `${value.label} - ${value.display_address}`,
                    longitude: Number(value.coordinates.lon),
                    latitude: Number(value.coordinates.lat),
                  };

                  setForm(updated);
                }}
              />
            )}

            {form?.addressLine && (
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    px: 1.5,
                    py: 1.2,
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                    backgroundColor: "#fafafa",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#d1d5db",
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    spacing={1.2}
                    sx={{
                      overflow: "hidden",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        mt: 0.2,
                      }}
                    >
                      <MapPin size={16} stroke="#e35c35" />
                    </Box>

                    <Stack spacing={0.3} sx={{ minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          color: "#334155",
                          fontSize: 14,
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {form?.addressLine?.split("-")[0]}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: "#6b7280",
                          fontSize: 12,
                          lineHeight: 1.4,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {form?.addressLine?.split("-")[1]}
                      </Typography>
                    </Stack>
                  </Stack>

                  <IconButton
                    size="small"
                    type="button"
                    onClick={() => {
                      handleChange("addressLine", "");
                    }}
                    sx={{
                      ml: 1,
                      transition: "all 0.2s ease",

                      backgroundColor: "#fee2e2",
                      color: "#dc2626",
                    }}
                  >
                    <Trash2 size={15} />
                  </IconButton>
                </Stack>
                <Box
                  component="div"
                  sx={{
                    width: "100%",
                    height: 250,
                    objectFit: "cover",
                  }}
                >
                  <TripOpenStreetMapView
                    positions={[
                      {
                        latitude: form?.latitude,
                        longitude: form?.longitude,
                        label: form?.addressLine?.split("-")[0],
                      } as PositionItem,
                    ]}
                  />
                </Box>
              </>
            )}
          </Box>
        </Stack>
      </Box>
    </BaseModalBody>
  );
}
