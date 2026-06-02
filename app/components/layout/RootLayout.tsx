"use client";
import { LAYOUT_WIDTH_RESPONSIVE } from "@/app/providers";
import BaseDynamicModal from "@/libs/components/modal/BaseDynamicModal";
import { useBaseModal } from "@/libs/components/modal/BaseModalStore";
import BaseToast from "@/libs/components/toast/BaseToast";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { useGlobalStore } from "@/store/global-store";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Github } from "lucide-react";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const { isLoading, loadingMessage, setIsLoading } = useGlobalStore();
  const { message, isShow, type, hideToast } = useToast();
  const { isOpen, content: component, config, close } = useBaseModal();

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
      <Box component="main" sx={{ flex: 1 }}>
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

            <Link
              href="https://github.com/your-username/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#334155",
                fontSize: 10,
              }}
            >
              <Github size={14} />
              View Source
            </Link>
          </Box>
        </Container>
      </Box>
      <BaseToast
        isShow={isShow}
        message={message}
        type={type}
        onClose={hideToast}
      />
      {/* {isOpen && component && (
        <BaseModal
          open={isOpen}
          onClose={close}
          title={config?.title}
          maxWidth={config?.maxWidth || "sm"}
          actions={config?.actions}
        >
          {component}
        </BaseModal>
      )} */}

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
