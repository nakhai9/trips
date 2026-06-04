"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Github, Globe, Layers } from "lucide-react";

export default function SourceAndApi() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#f8fafc 0%,#ffffff 35%,#f8fafc 100%)",
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          py: 5,
          background:
            "radial-gradient(circle at top, rgba(59,130,246,.15), transparent 40%)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Chip
              label="Travel Planning Platform"
              color="primary"
              variant="outlined"
            />

            <Typography
              variant="h1"
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: "3rem",
                  md: "5rem",
                },
              }}
            >
              Trips
            </Typography>

            <Typography
              variant="h5"
              sx={{
                maxWidth: 900,
                color: "text.secondary",
                fontWeight: 400,
              }}
            >
              Nền tảng xây dựng, quản lý và chia sẻ hành trình du lịch được phát
              triển bằng Next.js, Spring Boot và Material UI.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="small"
                href="https://github.com/nakhai9/trips"
                target="_blank"
              >
                Source Code
              </Button>

              <Button
                variant="outlined"
                size="small"
                href="https://trips-1741.onrender.com/swagger-ui/index.html"
                target="_blank"
              >
                Swagger API
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Overview */}
      <Container maxWidth="lg">
        <Box py={5}>
          <Typography variant="h3" fontWeight={700} textAlign="center" mb={3}>
            Tổng quan dự án
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              maxWidth: 900,
              mx: "auto",
              color: "text.secondary",
              lineHeight: 1.8,
            }}
          >
            Trips là dự án Fullstack giúp người dùng xây dựng các hành trình du
            lịch, quản lý địa điểm, theo dõi lịch trình và chia sẻ với cộng
            đồng. Dự án được xây dựng nhằm thực hành kiến trúc hệ thống thực tế,
            thiết kế REST API, xác thực người dùng và triển khai ứng dụng lên
            môi trường production.
          </Typography>
        </Box>

        {/* Features */}
        <Box py={4}>
          <Typography variant="h3" fontWeight={700} textAlign="center" mb={6}>
            Tính năng nổi bật
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Globe size={32} />

                    <Typography variant="h6" fontWeight={700}>
                      Quản lý hành trình
                    </Typography>

                    <Typography color="text.secondary">
                      Tạo, chỉnh sửa và quản lý các hành trình du lịch cá nhân
                      một cách trực quan.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Layers size={32} />

                    <Typography variant="h6" fontWeight={700}>
                      Chia sẻ cộng đồng
                    </Typography>

                    <Typography color="text.secondary">
                      Chia sẻ hành trình để người dùng khác có thể tham khảo và
                      học hỏi kinh nghiệm du lịch.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Architecture */}
        <Box py={5}>
          <Typography variant="h3" fontWeight={700} textAlign="center" mb={6}>
            Kiến trúc hệ thống
          </Typography>

          <Grid container spacing={3}>
            {/* Frontend */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={700}>
                    Frontend
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                    Giao diện người dùng và trải nghiệm tương tác.
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                    useFlexGap
                  >
                    <Chip label="Next.js" color="primary" />
                    <Chip label="React" color="primary" />
                    <Chip label="TypeScript" color="primary" />
                    <Chip label="Material UI" color="primary" />
                    <Chip label="Leaflet" color="primary" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Backend */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={700}>
                    Backend
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                    Xử lý nghiệp vụ, xác thực và cung cấp REST API.
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                    useFlexGap
                  >
                    <Chip label="Spring Boot" color="success" />
                    <Chip label="Spring Security" color="success" />
                    <Chip label="JWT" color="success" />
                    <Chip label="Swagger" color="success" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Database */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={700}>
                    Database
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                    Lưu trữ và quản lý dữ liệu hệ thống.
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                    useFlexGap
                  >
                    <Chip label="MySQL" color="warning" />
                    <Chip label="JPA" color="warning" />
                    <Chip label="Hibernate" color="warning" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Author */}
        <Box py={5}>
          <Typography variant="h3" fontWeight={700} textAlign="center" mb={4}>
            Tác giả
          </Typography>

          <Card
            sx={{
              borderRadius: 4,
            }}
          >
            <CardContent sx={{ p: 5 }}>
              <Stack spacing={3} alignItems="center">
                <Typography variant="h4" fontWeight={700}>
                  Nguyễn Anh Khải
                </Typography>

                <Typography
                  textAlign="center"
                  sx={{
                    maxWidth: 700,
                    color: "text.secondary",
                  }}
                >
                  Fullstack Developer. Dự án Trips được xây dựng nhằm thực hành
                  phát triển hệ thống Fullstack từ frontend, backend, database
                  đến triển khai production và tài liệu hóa API bằng Swagger.
                </Typography>

                <Divider flexItem />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    href="https://khai-portfolio.vercel.app/"
                    target="_blank"
                  >
                    Portfolio
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<Github size={18} />}
                    href="https://github.com/nakhai9/trips"
                    target="_blank"
                  >
                    GitHub
                  </Button>

                  <Button variant="outlined" href="mailto:nakhai.fw@gmail.com">
                    Contact Me
                  </Button>

                  <Button variant="outlined" href="tel:0945757051">
                    Call
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          py: 4,
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography textAlign="center" color="text.secondary">
            Built with Next.js, Spring Boot, Material UI & MySQL © 2025
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
