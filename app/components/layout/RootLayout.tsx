"use client";
import { LAYOUT_WIDTH_RESPONSIVE } from "@/app/providers";
import BaseToast from "@/libs/components/BaseToast";
import { useGlobalStore, useToast } from "@/store/global-store";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const { isLoading, loadingMessage, setIsLoading } = useGlobalStore();
  const { message, isShow, type, hideToast } = useToast();
  return (
    <Box
      sx={{
        backgroundColor: "#FFFDF3",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "inherit",
      }}
    >
      <Box component="main" sx={{ flex: 1 }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: { ...LAYOUT_WIDTH_RESPONSIVE },
            mx: "auto",
            width: "100%",
            px: {
              xs: 4,
              md: 0,
              lg: 0,
            },
          }}
        >
          {children}
        </Container>
      </Box>
      <BaseToast
        isShow={isShow}
        message={message}
        type={type}
        onClose={hideToast}
      />
      <Backdrop sx={{ zIndex: 9999 }} open={isLoading}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress color="warning" />
          {loadingMessage && (
            <Typography
              sx={{
                color: "common.white",
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
    </Box>
  );
}
