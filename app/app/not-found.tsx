import { Box } from "@mui/material";

const STYLES = {
  root: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    height: 300,
    width: 300,
    objectFit: "cover",
  },
};

export default function NotFound() {
  return (
    <Box sx={STYLES.root}>
      <Box
        component="img"
        src="https://img.freepik.com/premium-vector/construction-concept-illustration_86047-110.jpg?semt=ais_hybrid&w=740&q=80"
        sx={STYLES.img}
      ></Box>
    </Box>
  );
}
