import { Box, Typography } from "@mui/material";

export default function TripCard() {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        boxShadow: "0 4px 24px #e0e0e0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
        border: "1px solid transparent", // thêm dòng này
        "&:hover": {
          borderColor: "#c94e2d",
        },
      }}
    >
      <Box
        sx={{
          minWidth: 0,
          display: "flex",
          justifyContent: "center",
          height: "100px !important",
        }}
      >
        <Box
          component="img"
          src="/plan-2.jpg"
          alt="Demo"
          sx={{ height: "100%" }}
        />
      </Box>
      <Box
        sx={{
          flex: 0.5,
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          p: 3,
        }}
      >
        <Typography
          sx={{
            color: "#444444",
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          Hành trình trên đất phù xa
        </Typography>
      </Box>
    </Box>
  );
}
