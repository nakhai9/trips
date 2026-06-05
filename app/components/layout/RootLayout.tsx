"use client";
import { LAYOUT_WIDTH_RESPONSIVE } from "@/app/providers";
import BaseDynamicModal from "@/libs/components/modal/BaseDynamicModal";
import BaseToast from "@/libs/components/toast/BaseToast";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import TopToolbar from "./TopToolbar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const { isLoading, loadingMessage, setIsLoading } = useGlobalStore();
  const { message, isShow, type, hideToast } = useToast();

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "inherit",
      }}
    >
      <Box component="main" sx={{ flex: 1, position: "relative" }}>
        <TopToolbar />

        <Container
          maxWidth={false}
          sx={{
            maxWidth: { ...LAYOUT_WIDTH_RESPONSIVE },
            mx: "auto",
            width: "100%",
            px: {
              xs: 2,
              md: 0,
              lg: 0,
            },
          }}
        >
          {children}
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
              mt: 2,
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
          </Box>
        </Container>
      </Box>
      <BaseToast
        isShow={isShow}
        message={message}
        type={type}
        onClose={hideToast}
      />

      <Backdrop sx={{ zIndex: 9999, background: "#fff" }} open={isLoading}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress color="warning" />
          {loadingMessage && (
            <Typography
              sx={{
                color: "#c94e2d",
                px: 2,
                textAlign: "center",
                fontSize: { xs: "0.75rem", md: "0.875rem" },
              }}
            >
              {loadingMessage}
            </Typography>
          )}
        </Stack>
      </Backdrop>

      <BaseDynamicModal />
    </Box>
  );
}
