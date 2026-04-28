"use client";

import { Alert, Snackbar } from "@mui/material";
import type { ReactNode } from "react";

type BaseToastProps = {
  isShow: boolean;
  type: "success" | "error" | "warning" | "info";
  message: ReactNode;
  onClose?: () => void;
};

export default function BaseToast({
  isShow = false,
  type = "success",
  message,
  onClose,
}: BaseToastProps) {
  return (
    <Snackbar
      open={isShow}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={onClose}
      sx={{}}
    >
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
