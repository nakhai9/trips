"use client";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { DATE_FORMAT } from "@/libs/constants";
import { useGlobalStore } from "@/store/global-store";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Eye, Link2, LockKeyhole, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { useState } from "react";
type TripCardProps = {
  id: string;
  title: string;
  isPublic?: boolean;
  startDate: Date;
  endDate?: Date;
};
export default function TripCard({
  id,
  title,
  isPublic = true,
  startDate,
  endDate,
}: TripCardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { showError, showSuccess } = useToast();
  const { setIsLoading } = useGlobalStore();
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const getQrCodeUrl = async (id: string) => {
    return await QRCode.toDataURL(`${window.location.origin}/trips/${id}`);
  };

  const genQRCode = async (id: string) => {
    const url = await getQrCodeUrl(id);
    setQrCodeUrl(url);
  };

  const copyToShare = async (id: string) => {
    if (!id) return;
    const url = `${window.location.origin}/trips/${id}`;
    navigator.clipboard.writeText(url);
    showSuccess("Đã sao chép đường dẫn chia sẻ");
  };

  return (
    <>
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
          border: "1px solid transparent",
          transition: "all 0.3s ease",

          "&:hover": {
            borderColor: "#c94e2d",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            transform: "translateY(-4px)",

            "& .actions": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: 120,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src="/plan-2.jpg"
            alt="Demo"
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box
          sx={{
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                color: "#444",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {title}
            </Typography>
            {!isPublic && <LockKeyhole size={16} />}
          </Box>

          <Typography sx={{ fontSize: 13, color: "#777" }}>
            {dayjs(startDate).format(DATE_FORMAT)} -{" "}
            {dayjs(endDate).format(DATE_FORMAT)}
          </Typography>
        </Box>

        <Stack
          sx={{ pb: 2 }}
          direction="row"
          justifyContent="center"
          className="actions"
        >
          <IconButton
            size="small"
            type="button"
            onClick={() => copyToShare(id)}
          >
            <Link2 size={18} />
          </IconButton>
          <IconButton size="small" type="button" onClick={() => setOpen(!open)}>
            <QrCode size={18} />
          </IconButton>
          <IconButton
            size="small"
            type="button"
            onClick={() => router.push(`trips/${id}`)}
          >
            <Eye size={18} />
          </IconButton>
        </Stack>
      </Box>
      {/* <BaseModal
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        title="Chuyến đi mới"
        actions={
          <>
            <Button type="button" onClick={() => setOpen(!open)}>
              Hủy
            </Button>
            <Button
              variant="contained"
              size="small"
              type="button"
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
          </>
        }
      >
       
      </BaseModal> */}
    </>
  );
}
