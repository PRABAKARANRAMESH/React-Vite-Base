import { useAppSelector, type RootState } from "@/store/store";
import { Box, styled, Typography } from "@mui/material";
import { CardCoin } from "iconsax-react";
import { Link } from "react-router-dom";

const Logo = () => {
  const customizer = useAppSelector((state: RootState) => state.customizer);
  const isCollapsed = customizer.isCollapse;

  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    paddingInline: isCollapsed ? "12px" : "16px",
    justifyContent: isCollapsed ? "center" : "flex-start",
  }));

  return (
    <Box
      sx={{
        height: customizer.TopbarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      <LinkStyled to="/">
        <Box
          sx={{
            backgroundColor: "grey.900",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            width: 36,
            height: 36,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <CardCoin size="18" color="currentColor" variant="Bulk" />
        </Box>

        {!isCollapsed && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              whiteSpace: "nowrap",
              fontSize: "0.95rem",
              letterSpacing: "-0.01em",
            }}
          >
            BASE APP
          </Typography>
        )}
      </LinkStyled>
    </Box>
  );
};

export default Logo;
