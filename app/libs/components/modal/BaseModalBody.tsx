import { DialogContent } from "@mui/material";
type BaseModalBodyProps = {
  children: React.ReactNode;
};
export default function BaseModalBody({ children }: BaseModalBodyProps) {
  return (
    <>
      <DialogContent>{children}</DialogContent>
      {/* <DialogActions sx={{ px: 3, py: 2.5 }}></DialogActions> */}
    </>
  );
}
