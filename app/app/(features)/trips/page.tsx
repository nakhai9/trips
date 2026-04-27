"use client";

import RootLayout from "@/components/layout/RootLayout";
import TripCard from "@/components/ui/TripCard";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import router from "next/router";

export default function TripPage() {
  return (
    <RootLayout>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{ color: "#444444", fontWeight: 600, fontSize: 18, my: 2 }}
        >
          Những chuyến đi của bạn
        </Typography>

        <Box>
          <Button
            variant="contained"
            size="small"
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
            onClick={() => router.push("trips")}
          >
            Tạo mới
          </Button>
        </Box>
      </Stack>
      <Grid container spacing={2}>
        <Grid
          size={{
            sm: 1,
            md: 3,
          }}
        >
          <TripCard />
        </Grid>
        <Grid
          size={{
            sm: 1,
            md: 3,
          }}
        >
          <TripCard />
        </Grid>{" "}
        <Grid
          size={{
            sm: 1,
            md: 3,
          }}
        >
          <TripCard />
        </Grid>
      </Grid>
    </RootLayout>
  );
}
