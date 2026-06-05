"use client";
import TopToolbar from "@/components/layout/TopToolbar";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        background: "#f8f5f1",
        minHeight: "100vh",
        color: "#334155",
        position: "relative",
      }}
    >
      <Box
        sx={{
          minHeight: { xs: "auto", md: 400 },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage:
            "url('https://urszihlmann.com/images/son-doong/Vietnam-SonDoong-Dinosaurs-Portrait_1778.jpg')",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TopToolbar background="ghost" />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: 480,
                },
              }}
            >
              <Typography
                component="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: 36, md: 54 },
                  lineHeight: 1.1,
                  mb: 2,
                  color: "#e35c35",
                  textShadow: `2px 2px 0 rgba(0,0,0,0.9)`,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: "#F8F8FF",
                    fontStyle: "italic",
                    fontWeight: 600,
                  }}
                >
                  Tạo lịch trình dễ dàng cho những chuyến đi với{" "}
                </Box>
                Trips
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  background: "#e35c35",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: 14,
                  px: 4,
                  py: 1,
                  borderRadius: "50px",
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
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
            <Typography sx={{ color: "#334155", fontSize: 18, my: 1 }}>
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
              onClick={() => router.push("/trips")}
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
      <Container maxWidth="lg">
        <Box
          component="footer"
          sx={{
            borderTop: "1px solid #ddd",
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#334155",
              opacity: 0.8,
              letterSpacing: 0.5,
            }}
          >
            Built with Next.js, Spring Boot, Material UI, and Leaflet. © 2025
          </Typography>

          <Link
            href="https://github.com/your-username/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              color: "#334155",
              fontSize: 10,
            }}
          >
            <Github size={14} />
            View Source
          </Link>
        </Box>
      </Container>
    </div>
  );
}
