import PageContainer from "@/components/page-container/PageContainer";
import { Typography, Button, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="404 - Not Found" description="Page not found">
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h1" fontWeight={700} color="primary.main" sx={{ fontSize: "6rem" }}>
            404
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default NotFound;
