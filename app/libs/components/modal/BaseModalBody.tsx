import { DialogActions, DialogContent } from "@mui/material";
type BaseModalBodyProps = {
  children: React.ReactNode;
  actions?: React.ReactNode;
};
export default function BaseModalBody({
  children,
  actions,
}: BaseModalBodyProps) {
  return (
    <>
      <DialogContent>{children}</DialogContent>
      {actions && (
        <DialogActions sx={{ px: 3, py: 2.5 }}>{actions}</DialogActions>
      )}
    </>
  );
}
