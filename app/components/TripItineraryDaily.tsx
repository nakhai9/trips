"use client";

import { Itinerary } from "@/types/common";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { MapPin, Pen, Plane } from "lucide-react";

import { useBaseDynamicModal } from "@/libs/components/modal/BaseDynamicModalStore";
import ItineraryForm from "./forms/ItineraryForm";
import TripActivitySection from "./TripActivitySection";

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
  const { openBdm, setModalEvent } = useBaseDynamicModal();

  const handleOpenDetailModal = async () => {
    const form = await openBdm(<ItineraryForm />, {
      title: "Kê hoạch ngày " + dayNumber,
      formData: {
        ...itinerary,
      },
    });
  };

  const handleOpenCreateModal = async () => {
    await openBdm(<ItineraryForm />, {
      title: "Kế hoạch ngày " + dayNumber,
      // hideHeader: true,
      formData: {
        dayNumber: dayNumber,
        ...itinerary,
        planId: planId,
      },
    });
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
            <IconButton type="button" onClick={handleOpenDetailModal}>
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

      {(itinerary?.destinations?.split(",") || []).length > 0 && (
        <TripActivitySection
          activities={itinerary?.activities ?? []}
          itineraryId={itinerary?.id ?? ""}
        />
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
            onClick={handleOpenCreateModal}
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
