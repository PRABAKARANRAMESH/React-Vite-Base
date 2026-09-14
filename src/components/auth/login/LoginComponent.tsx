import React from "react";
import { Box, Typography } from "@mui/material";
import AuthLogin from "./AuthLogin";
import birdLoginBg from "@/assets/common/bird_login_img.png";
import { Chart2, Global, People, Tree } from "iconsax-react";

const forest = "#2F6B3A";
const forestMuted = "#5A7D5C";

const featureItems = [
  { label: "Protect Habitats", Icon: Tree },
  { label: "Manage Bird Data", Icon: Chart2 },
  { label: "Support Research", Icon: People },
  { label: "Build a Greener Tomorrow", Icon: Global },
];

const LoginComponent: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        bgcolor: "#1e3324",
      }}
    >
      <Box
        component="img"
        src={birdLoginBg}
        alt=""
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: {
            xs: "75% 40%",
            sm: "70% 45%",
            md: "62% 50%",
            lg: "58% 50%",
          },
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: {
            xs: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.18) 100%)",
            md: "linear-gradient(90deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.1) 32%, transparent 52%)",
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          px: { xs: 2, sm: 3.5, md: 5, lg: 6.5 },
          pt: { xs: 2, md: 3 },
          pb: { xs: 1.5, md: 2.5 },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            flex: "1 1 auto",
            minHeight: 0,
            width: "100%",
            maxWidth: 400,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderRadius: "28px",
              px: { xs: 3, sm: 3.5 },
              py: { xs: 3.25, sm: 3.75 },
              bgcolor: "rgba(255,255,255,0.58)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1px solid rgba(255,255,255,0.78)",
              boxShadow: "0 22px 55px rgba(15,35,20,0.18)",
              "@media (max-height: 740px)": { py: 2.5, px: 3 },
              "@media (max-height: 620px)": { py: 1.75, px: 2.5, borderRadius: "22px" },
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                mb: 3,
                "@media (max-height: 740px)": { mb: 2 },
                "@media (max-height: 620px)": { mb: 1.25 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 26, sm: 30 },
                  color: forest,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  "@media (max-height: 620px)": { fontSize: 22 },
                }}
              >
                Bird Management
              </Typography>
              <Typography
                sx={{
                  mt: 0.8,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: forestMuted,
                  "@media (max-height: 620px)": { mt: 0.4, fontSize: 12 },
                }}
              >
                Monitor • Manage • Conserve
              </Typography>
            </Box>

            <Box
              sx={{
                mb: 2.25,
                "@media (max-height: 740px)": { mb: 1.5 },
                "@media (max-height: 620px)": { mb: 1 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 20,
                  color: forest,
                  mb: 0.35,
                  "@media (max-height: 620px)": { fontSize: 17 },
                }}
              >
                Sign In
              </Typography>
              <Typography
                sx={{
                  fontSize: 13.5,
                  color: "rgba(55,75,60,0.72)",
                  "@media (max-height: 620px)": { fontSize: 12.5 },
                }}
              >
                Access your account to continue
              </Typography>
            </Box>

            <AuthLogin />
          </Box>
        </Box>

        <Box
          sx={{
            flex: "0 0 auto",
            width: "100%",
            maxWidth: { xs: 400, md: 760 },
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: { xs: 1.25, sm: 2.25, md: 2.75 },
            pt: 1.5,
            "@media (max-height: 580px)": { display: "none" },
          }}
        >
          {featureItems.map(({ label, Icon }) => (
            <Box
              key={label}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                color: "#fff",
                textShadow: "0 1px 10px rgba(0,0,0,0.55)",
                flex: { xs: "1 1 calc(50% - 8px)", sm: "0 0 auto" },
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  flexShrink: 0,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.35)",
                }}
              >
                <Icon size={13} color="currentColor" variant="Bold" />
              </Box>
              <Typography sx={{ fontSize: { xs: 11.5, sm: 12.5 }, fontWeight: 600, lineHeight: 1.25 }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginComponent;
