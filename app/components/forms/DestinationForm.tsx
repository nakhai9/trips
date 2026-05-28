import { Box, Stack, Typography } from "@mui/material";
import { MapPin } from "lucide-react";
import { useState } from "react";
import TripLocationSearch from "../TripLocationSearch";

export default function DestinationForm() {
  const [destinations, setDestinations] = useState<string[]>([]);

  const handleDestinationChange = (value: { label: string } | null) => {
    if (!value?.label) return;
    setDestinations((prev) => [...prev, value?.label]);
  };
  return (
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
            color: "#e35c35",
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

        <Stack direction="column" spacing={1}>
          <Typography
            variant="body2"
            sx={{
              color: "#334155",
              lineHeight: 1.6,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            ĐỊA ĐIỂM ĐẾN TRONG NGÀY
          </Typography>
          {destinations.map((d, idx) => (
            <Box
              key={d + idx}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 5,
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MapPin size={16} /> {d}
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
