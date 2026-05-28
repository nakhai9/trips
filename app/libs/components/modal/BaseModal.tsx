"use client";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";

type BaseModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  hideHeader?: boolean;
};

export default function BaseModal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  hideHeader = false,
}: BaseModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      {title && (
        <DialogTitle
          sx={{
            display: hideHeader ? "none" : "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.5,
          }}
        >
          <Typography fontWeight={600} sx={{ color: "#334155" }}>
            {title}
          </Typography>

          <IconButton onClick={onClose}>
            <X size={18} />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent dividers>
        <Box sx={{ p: 0 }}>{children}</Box>
      </DialogContent>

      {actions && <DialogActions sx={{ p: 1.5 }}>{actions}</DialogActions>}
    </Dialog>
  );
}
