"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        background: "#f8f5f1",
        minHeight: "100vh",
        color: "#444444",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            mb: 12,
            gap: { xs: 6, md: 0 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: 36, md: 54 },
                lineHeight: 1.1,
                mb: 2,
                color: "#e35c35",
              }}
            >
              <Box
                component="span"
                sx={{
                  color: "#444444",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                Tạo lịch trình dễ dàng cho những chuyến đi với{" "}
              </Box>
              Trips
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  background: "#e35c35",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: 18,
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "0 2px 12px #e35c3530",
                  "&:hover": { background: "#c94e2d" },
                }}
                onClick={() => router.push("trips")}
              >
                Tạo lịch trình mới
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
              mt: { xs: 6, md: 0 },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: 420 },
                maxWidth: 480,
                borderRadius: 4,
                boxShadow: "0 8px 32px #e35c3520",
                overflow: "hidden",
                background: "#fff",
                p: 0,
              }}
            >
              <Box
                component="img"
                src="/trip-2.jpg"
                alt="Trip 2"
                sx={{ width: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 6, md: 0 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              component="h2"
              sx={{
                color: "#e35c35",
                fontWeight: 800,
                fontSize: { xs: 28, md: 40 },
                mb: 1,
              }}
            >
              Đánh dấu và Chia sẻ
            </Typography>
            <Typography sx={{ color: "#444444", fontSize: 18, my: 1 }}>
              Đánh dấu/ghim những nơi đã đi qua và chia sẻ dưới dạng hình ảnh
              bản đồ vector
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#e35c35",
                color: "#e35c35",
                fontWeight: 600,
                fontSize: 18,
                px: 4,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                background: "#fff",
                "&:hover": { borderColor: "#c94e2d", background: "#fbeee7" },
              }}
              onClick={() => router.push("pin-and-share")}
            >
              Bắt đầu
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
              mb: { xs: 4, md: 0 },
            }}
          >
            <Box
              component="img"
              src="/trip-7.avif"
              alt="Road Trip"
              sx={{
                width: { xs: "100%", md: 420 },
                maxWidth: 480,
                borderRadius: 4,
                boxShadow: "0 4px 24px #e35c3520",
              }}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
}
