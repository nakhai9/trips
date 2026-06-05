"use client";
import { useToast } from "@/libs/components/toast/BaseToastStore";
import { IS_SYSTEM_MASTER } from "@/libs/config";
import { useGlobalStore } from "@/store/global-store";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  CalendarClock,
  Eye,
  Link2,
  LockKeyhole,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { useState } from "react";
type TripCardProps = {
  id: string;
  title: string;
  isPublic?: boolean;
  startDate: Date;
  endDate?: Date;
  viewCount?: number;
  delFn?: () => void;
};
export default function TripsCard({
  id,
  title,
  isPublic = true,
  startDate,
  endDate,
  viewCount,
  delFn,
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

            "& .actions": {
              opacity: 1,
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
            src="/trip-10.jpg"
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
            {!isPublic && <LockKeyhole size={16} color="red" />}
          </Box>

          <Stack
            direction="column"
            spacing={1}
            sx={{
              color: "#334155",
              fontSize: 13,
            }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CalendarClock size={14} />
              <Typography variant="caption">
                {dayjs(endDate).diff(dayjs(startDate), "day")}N{" "}
                {dayjs(endDate).diff(dayjs(startDate), "day") - 1}Đ
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Eye size={14} />
              <Typography variant="caption">{viewCount} đã xem</Typography>
            </Stack>
          </Stack>
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
          {/* <IconButton size="small" type="button" onClick={() => setOpen(!open)}>
            <QrCode size={18} />
          </IconButton> */}
          <IconButton
            size="small"
            type="button"
            onClick={() => router.push(`trips/${id}`)}
          >
            <SquareArrowOutUpRight size={18} />
          </IconButton>
          {IS_SYSTEM_MASTER && delFn && (
            <IconButton size="small" type="button" onClick={delFn}>
              <Trash2 size={18} />
            </IconButton>
          )}
        </Stack>
      </Box>
    </>
  );
}
