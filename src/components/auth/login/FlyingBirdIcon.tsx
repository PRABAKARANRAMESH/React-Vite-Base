import { Box, keyframes } from "@mui/material";

const wingPulse = keyframes`
  0%, 100% {
    transform: scaleY(1) rotate(0deg);
  }
  50% {
    transform: scaleY(0.88) rotate(-6deg);
  }
`;

interface FlyingBirdIconProps {
  size?: number;
  color?: string;
  animate?: boolean;
}

/** Bold dove silhouette — readable at small sizes on the login button. */
const FlyingBirdIcon = ({
  size = 30,
  color = "#FFFFFF",
  animate = true,
}: FlyingBirdIconProps) => (
  <Box
    component="span"
    aria-hidden
    sx={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      flexShrink: 0,
      lineHeight: 0,
      filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.45))",
      transformOrigin: "center",
      animation: animate
        ? `${wingPulse} 0.32s ease-in-out infinite`
        : "none",
      "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
      },
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Classic bird-in-flight silhouette (facing right) */}
      <path d="M23 12c0 1.5-1.2 2.2-2.5 1.5-2.2-1.2-4.5-2-7-2.2 1.5 2.2 2.2 4.8 2.2 7.2 0 .8-.6 1.5-1.4 1.5S13 19.3 13 18.5c0-2-.8-4-2.2-5.5C9.5 14.8 8 16 6.5 17.2 5.5 18 4 17.3 4 16c0-3.5 2.5-6.5 6-8C7.5 6.5 6 4.5 6 2.5 6 1.5 7 1 7.8 1.5 10 3 12 5.5 13.5 8.5c2-.2 4-.8 5.8-1.8C20.5 6 22 7 22 8.5c0 1.2-.8 2-1.8 2.2.8.2 1.8.4 2.8 1.3z" />
    </svg>
  </Box>
);

export default FlyingBirdIcon;
