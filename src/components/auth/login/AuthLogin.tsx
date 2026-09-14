import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  keyframes,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowRight2, Eye, EyeSlash, Lock, User } from "iconsax-react";
import authServices from "@/service/auth-services";
import { useUsers } from "@/context/user-context/user-context";
import { pickTokensFromLogin, setAuthTokens } from "@/utils/auth-session";
import FlyingBirdIcon from "./FlyingBirdIcon";

const forest = "#2F6B3A";
const forestDark = "#245530";

/** Total pre-submit flight sequence (ms). */
const BIRD_ANIMATION_MS = 1500;
/** Text fade + bird appear overlap (ms). */
const TEXT_FADE_MS = 280;

const birdFly = keyframes`
  0% {
    left: 8%;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9) rotate(-8deg);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(-4deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, calc(-50% - 2px)) scale(1) rotate(0deg);
  }
  100% {
    left: 92%;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.05) rotate(6deg);
  }
`;

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "999px",
    bgcolor: "#fff",
    "& fieldset": { borderColor: "rgba(47,107,58,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(47,107,58,0.3)" },
    "&.Mui-focused fieldset": { borderColor: forest, borderWidth: 1.5 },
  },
  "& .MuiInputBase-input": {
    py: 1.4,
    px: 0.5,
    fontSize: 14.5,
    "@media (max-height: 700px)": { py: 1.1 },
    "@media (max-height: 600px)": { py: 0.9, fontSize: 13.5 },
  },
  "& .MuiFormHelperText-root": {
    mx: 1.5,
    mt: 0.25,
    mb: 0,
    lineHeight: 1.2,
  },
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AuthLogin: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { refreshUser } = useUsers();
  const animationLock = useRef(false);

  const runLogin = useCallback(
    async (values: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        const loginRes = await authServices.login({
          mail: values.email,
          password: values.password,
        });

        const { access, refresh } = pickTokensFromLogin(loginRes);
        if (access) setAuthTokens(access, refresh);

        const user = await refreshUser();
        if (user) {
          navigate("/");
        }
      } catch (error: unknown) {
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false);
        setIsAnimating(false);
        animationLock.current = false;
      }
    },
    [navigate, refreshUser]
  );

  const formik = useFormik({
    initialValues: { email: "", password: "", remember: true },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (animationLock.current || isLoading) return;
      animationLock.current = true;

      if (prefersReducedMotion()) {
        await runLogin(values);
        return;
      }

      setIsAnimating(true);
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, BIRD_ANIMATION_MS);
      });
      await runLogin(values);
    },
  });

  const busy = isAnimating || isLoading;

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.6,
        "@media (max-height: 700px)": { gap: 1.15 },
        "@media (max-height: 600px)": { gap: 0.9 },
      }}
    >
      <TextField
        id="email"
        name="email"
        placeholder="Username"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        autoComplete="username"
        disabled={busy}
        sx={fieldSx}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <User size={18} color="#8A9A8E" variant="Linear" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        id="password"
        name="password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
        autoComplete="current-password"
        disabled={busy}
        sx={fieldSx}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock size={18} color="#8A9A8E" variant="Linear" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disableFocusRipple
                disableRipple
                onClick={() => setShowPassword((p) => !p)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                size="small"
                disabled={busy}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye size={18} color="#8A9A8E" variant="Linear" />
                ) : (
                  <EyeSlash size={18} color="#8A9A8E" variant="Linear" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          px: 0.5,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              checked={formik.values.remember}
              onChange={formik.handleChange}
              size="small"
              disabled={busy}
              sx={{
                p: 0.5,
                color: forest,
                "&.Mui-checked": { color: forest },
              }}
            />
          }
          label="Remember me"
          sx={{
            m: 0,
            "& .MuiFormControlLabel-label": {
              fontSize: 13.5,
              color: forest,
              fontWeight: 500,
            },
          }}
        />
        <Link
          href="#"
          underline="always"
          onClick={(e) => e.preventDefault()}
          sx={{
            fontSize: 13.5,
            fontWeight: 600,
            color: forest,
            textUnderlineOffset: 3,
          }}
        >
          Forgot password?
        </Link>
      </Box>

      <Button
        type="submit"
        disabled={busy}
        fullWidth
        aria-busy={busy}
        aria-label={isAnimating ? "Signing in" : "Log In"}
        sx={{
          mt: 0.5,
          py: 1.4,
          borderRadius: "999px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: 15.5,
          bgcolor: forest,
          color: "#fff",
          boxShadow: "0 12px 28px rgba(47,107,58,0.28)",
          position: "relative",
          overflow: "hidden",
          minHeight: 48,
          "&:hover": { bgcolor: forestDark },
          "&.Mui-disabled": {
            bgcolor: forest,
            color: "#fff",
            opacity: 1,
          },
          "@media (max-height: 700px)": { py: 1.15, minHeight: 44 },
          "@media (max-height: 600px)": { py: 0.95, fontSize: 14.5, minHeight: 42 },
          "@media (prefers-reduced-motion: reduce)": {
            "& .login-bird": { animation: "none !important" },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          {/* Label + arrow — fade out once validation passes */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateY(4px) scale(0.96)" : "none",
              transition: `opacity ${TEXT_FADE_MS}ms ease, transform ${TEXT_FADE_MS}ms ease`,
              pointerEvents: "none",
              visibility: isAnimating ? "hidden" : "visible",
              transitionDelay: isAnimating ? "0ms" : "0ms",
            }}
          >
            <Box component="span">Log In</Box>
            <ArrowRight2 size={17} color="currentColor" variant="Bold" />
          </Box>

          {/* Bird flight track — contained inside the button */}
          {isAnimating && (
            <Box
              className="login-bird"
              sx={{
                position: "absolute",
                top: "50%",
                left: "8%",
                zIndex: 2,
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                animation: `${birdFly} ${BIRD_ANIMATION_MS}ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards`,
                willChange: "left, transform, opacity",
              }}
            >
              <FlyingBirdIcon size={30} color="#FFFFFF" animate />
            </Box>
          )}
        </Box>
      </Button>
    </Box>
  );
};

export default AuthLogin;
