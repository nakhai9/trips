"use client";
import { LAYOUT_WIDTH_RESPONSIVE } from "@/app/providers";
import { GithubIcon } from "@/libs/icons";
import { Box, Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

type TopToolbarProps = {
  background?: "ghost" | string;
};
export default function TopToolbar({ background }: TopToolbarProps) {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          flex: 1,
          position: "fixed",
          top: 0,
          zIndex: 10,
          left: 0,
          width: "100%",
          background: background ? background : "white",
        }}
      >
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
          <Box
            sx={{
              height: {
                xs: 48,
                md: 56,
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              borderBottom: background !== "ghost" ? "1px solid #ddd" : "unset",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button type="button" onClick={() => router.push("/trips")}>
                Lịch trình
              </Button>
              <Button
                type="button"
                startIcon={<GithubIcon />}
                onClick={() => router.push("/source-and-api")}
              >
                Source & API
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        className="toolbar-spacer"
        sx={{
          height: {
            xs: 48,
            md: 56,
          },
        }}
      ></Box>
    </>
  );
}
