import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { HambergerMenu, Logout, Setting2 } from "iconsax-react";
import { useAppDispatch } from "@/store/store";
import { toggleMobileSidebar } from "@/store/custom/customizerSlice";
import SettingsDrawer from "@/components/settings/SettingsDrawer";

type User = {
  name: string;
  role?: string;
};

export type HeaderProps = {
  title?: string;
  subtitle?: string;
  user: User;
  onLogout?: () => void;
};

const RightControls = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export default function HeaderAppBar({ title = "", subtitle = "", user, onLogout }: HeaderProps) {
  const dispatch = useAppDispatch();
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [logoutOpen, setLogoutOpen] = React.useState(false);

  const initials = user.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: "paper" }}>
      <Toolbar sx={{ px: { xs: 2 }, py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          <IconButton onClick={() => dispatch(toggleMobileSidebar())} sx={{ display: { lg: "none" } }}>
            <HambergerMenu size={24} color="currentColor" />
          </IconButton>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        <RightControls>
          <IconButton onClick={() => setSettingsOpen(true)} color="primary" size="large">
            <Setting2 size={24} variant="Bulk" color="currentColor" />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 36, height: 36 }}>{initials}</Avatar>
            <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", minWidth: 80 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1 }}>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user.role ?? "User"}</Typography>
            </Box>
            <IconButton onClick={() => setLogoutOpen(true)} color="primary">
              <Logout size={22} color="currentColor" variant="Outline" />
            </IconButton>
          </Box>
        </RightControls>
      </Toolbar>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutOpen(false)}>Cancel</Button>
          <Button onClick={() => { setLogoutOpen(false); onLogout?.(); }} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
