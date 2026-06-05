"use client";
import { LAYOUT_WIDTH_RESPONSIVE } from "@/app/providers";
import { GithubIcon } from "@/libs/icons";
import { Box, Button, Container, Drawer, Stack } from "@mui/material";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TopToolbarProps = {
  background?: "ghost" | string;
};
export default function TopToolbar({ background }: TopToolbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Button type="button" onClick={() => router.push("/")}>
                Trang chủ
              </Button>
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
            <Box
              component="div"
              onClick={toggle}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
                color: background ? "#ffffff" : "#334155",
              }}
            >
              <Menu />
            </Box>
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
      <Drawer
        open={isOpen}
        anchor="right"
        sx={{ width: "100%" }}
        onClose={toggle}
        className="drawer"
      >
        <Box
          sx={{
            width: 250,
          }}
        >
          <Stack direction="column" spacing={1}>
            <Button size="small" type="button" onClick={() => router.push("/")}>
              Trang chủ
            </Button>
            <Button
              size="small"
              type="button"
              onClick={() => router.push("/trips")}
            >
              Lịch trình
            </Button>
            <Button
              type="button"
              size="small"
              startIcon={<GithubIcon />}
              onClick={() => router.push("/source-and-api")}
            >
              Source & API
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
