import { useMediaQuery, Box, Drawer, IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch, type RootState } from "@/store/store";
import {
  toggleMobileSidebar,
  toggleSidebar,
} from "@/store/custom/customizerSlice";
import SidebarItems from "./items/sidebar-items";
import Logo from "../shared/logo/logo";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const customizer = useAppSelector((state: RootState) => state.customizer);
  const dispatch = useAppDispatch();
  const toggleWidth = customizer.isCollapse
    ? customizer.MiniSidebarWidth
    : customizer.SidebarWidth;

  const isCollapsed = customizer.isCollapse;

  const collapseButton = (
    <IconButton
      size="small"
      onClick={() => dispatch(toggleSidebar())}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      sx={{
        position: "absolute",
        right: -14,
        top: "42%",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: 28,
        height: 28,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
        color: "text.secondary",
        "&:hover": {
          bgcolor: "background.paper",
          color: "text.primary",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.12)",
        },
      }}
    >
      {isCollapsed ? (
        <ArrowRight2 size={14} color="currentColor" variant="Bold" />
      ) : (
        <ArrowLeft2 size={14} color="currentColor" variant="Bold" />
      )}
    </IconButton>
  );

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          position: "relative",
          ...(customizer.isCollapse && {
            position: "absolute",
            height: "100%",
          }),
        }}
      >
        <Drawer
          anchor="left"
          open
          variant="permanent"
          sx={{
            width: toggleWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: toggleWidth,
              backgroundColor: "background.paper",
              boxSizing: "border-box",
              overflow: "visible",
              borderRight: "none",
              boxShadow: "4px 0 24px rgba(15, 23, 42, 0.04)",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.shortest,
                }),
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box sx={{ position: "relative", px: isCollapsed ? 0.5 : 0.5 }}>
              <Logo />
            </Box>

            <Box
              sx={{
                height: `calc(100vh - ${customizer.TopbarHeight}px)`,
                overflow: "auto",
                flex: 1,
                pb: 2,
              }}
            >
              <SidebarItems />
            </Box>

            {collapseButton}
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={1}>
        <Logo />
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
