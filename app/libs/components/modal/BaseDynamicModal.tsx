import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";
import { useBaseDynamicModal } from "./BaseDynamicModalStore";

export type BaseDynamicModalProps = {};
export default function BaseDynamicModal() {
  const { isOpen, config, content, closeBdm } = useBaseDynamicModal();

  const handleSubmit = () => {};
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeBdm}
        fullWidth
        maxWidth={config?.maxWidth || "sm"}
      >
        <DialogTitle
          sx={{
            display: config?.hideHeader ? "none" : "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
            px: 2,
          }}
        >
          <Typography fontWeight={600} sx={{ color: "#334155" }}>
            {config?.title || "Chưa gán title"}
          </Typography>

          <IconButton onClick={closeBdm}>
            <X size={16} />
          </IconButton>
        </DialogTitle>

        <DialogContent>{content}</DialogContent>

        <DialogActions sx={{ p: 1.5 }}>
          <Button
            variant="outlined"
            onClick={closeBdm}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              borderColor: "#ddd",
              color: "#111827",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Hủy bỏ
          </Button>
          {(config?.actions || []).map((act: any, index: number) => (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 2,
                py: 0.5,
                borderColor: "#e35c35",
                background: "#e35c35",
                fontWeight: 500,
                cursor: "pointer",
                color: "#fff",
                "&:hover": { background: "#c94e2d" },
              }}
              key={index}
              type={act.type || "submit"}
              onClick={() => {
                act.onClick?.();
              }}
            >
              {act.text || "Submit"}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
}
