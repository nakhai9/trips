"use client";
import { API_URLS } from "@/libs/api/api.constant";
import { HttpClient } from "@/libs/api/http";
import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import BaseModalBody from "@/libs/components/modal/BaseModalBody";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import { Itinerary } from "@/types/common";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { MapPin, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import TripLocationSearch from "../TripLocationSearch";

function useFetchItinerary() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showError } = useToast();
  const { setIsLoading } = useGlobalStore();

  const fetchItinerary = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const res = await HttpClient.get<Itinerary>(
        `${API_URLS.itineraries}/${id}`,
      );
      if (res) {
        console.log("Fetched itinerary:", res);
        setItinerary(res);
      }
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchItinerary, itinerary, loading, error };
}

export default function ItineraryForm() {
  const { fetchItinerary, itinerary } = useFetchItinerary();
  const { config } = useBaseDynamicModal();
  const { showError, showSuccess } = useToast();
  const { setIsLoading } = useGlobalStore();
  const { closeBdm } = useBaseDynamicModal();
  const [form, setForm] = useState<Partial<Itinerary>>({
    description: "",
    ...config?.formData,
  });
  const [destinations, setDestinations] = useState<string[]>([]);

  const handleRemove = (item: string) => {
    setDestinations((prev) => prev.filter((d) => d !== item));
  };
  const handleDestinationChange = (value: { label: string } | null) => {
    if (!value?.label) return;
    if (destinations.includes(value.label)) return;

    setDestinations((prev) => [...prev, value.label]);
  };
  const handleChange = (field: keyof Itinerary, value: any) => {
    console.log("Updating field:", field, "with value:", value);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    closeBdm();
    const payload = {
      ...form,
      destinations: destinations.join(","),
      destination: destinations[0] || "",
    };
    setIsLoading(true);
    try {
      if (config?.formData?.id) {
        const res = await HttpClient.put(
          `${API_URLS.itineraries}/${config.formData.id}`,
          payload,
        );
        if (res) {
          showSuccess("Cập nhật kế hoạch thành công");
        }
      } else {
        const res = await HttpClient.post(`${API_URLS.itineraries}`, payload);
        if (res) {
          showSuccess("Lên kế hoạch thành công");
        }
      }

      config?.onSuccess?.(true);

      setIsLoading(false);
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    if (!config?.formData?.id) return;
    fetchItinerary(config?.formData?.id);
  }, [fetchItinerary, config?.formData?.id]);

  useEffect(() => {
    if (!itinerary) return;

    setForm({
      ...itinerary,
    });

    setDestinations(
      itinerary.destinations
        ? Array.isArray(itinerary.destinations)
          ? itinerary.destinations
          : itinerary.destinations.split(",")
        : [],
    );
  }, [itinerary]);

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
            disabled={destinations.length === 0}
            sx={{
              textTransform: "none",
              background: "#e35c35",
              "&:hover": { background: "#c94e2d" },
            }}
          >
            Lưu
          </Button>
        </>
      }
    >
      <Stack direction="column" spacing={2}>
        <TextField
          label="Ghi chú"
          value={form?.description}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          size="small"
          multiline
          rows={4}
        />
        <TripLocationSearch
          placeholder="Tìm kiếm địa điểm..."
          sx={{ width: "100%" }}
          onChange={handleDestinationChange}
        />
        <Typography
          variant="body2"
          sx={{ color: "#334155", fontWeight: 500, textAlign: "center" }}
        >
          ĐỊA ĐIỂM TRONG NGÀY
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          {destinations.length > 0 &&
            destinations.map((d, idx) => (
              <Box
                key={idx}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 5,
                  px: 2,
                  py: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: 13,
                  backgroundColor: "#f8fafc",
                }}
              >
                <MapPin size={15} />
                {d}
                <Box
                  sx={{ cursor: "pointer", ml: 0.5 }}
                  onClick={() => handleRemove(d)}
                >
                  <X size={16} strokeWidth={3} />
                </Box>
              </Box>
            ))}
        </Stack>
      </Stack>
    </BaseModalBody>
  );
}
