import { Box, Typography } from "@mui/material";

const DashboardPage = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5" fontWeight={600}>
      Dashboard
    </Typography>
    <Typography color="text.secondary" mt={1}>
      Welcome to Bird Management.
    </Typography>
  </Box>
);

export default DashboardPage;
