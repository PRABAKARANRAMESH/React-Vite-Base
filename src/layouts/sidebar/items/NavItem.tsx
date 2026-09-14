import { useEffect, useMemo, useRef, useState, type ElementType, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";
import { ArrowDown2, ArrowRight2, ArrowUp2 } from "iconsax-react";
import type { MenuItem } from "./menu-items";
import { useAppSelector, type RootState } from "@/store/store";

interface NavItemProps {
  item: MenuItem;
  depth?: number;
}

const badgePalette: Record<
  NonNullable<MenuItem["badgeColor"]>,
  { bg: string; color: string }
> = {
  success: { bg: "rgba(76, 175, 80, 0.16)", color: "#2e7d32" },
  warning: { bg: "rgba(255, 152, 0, 0.18)", color: "#ef6c00" },
  error: { bg: "rgba(244, 67, 54, 0.16)", color: "#c62828" },
  info: { bg: "rgba(33, 150, 243, 0.16)", color: "#1565c0" },
  default: { bg: "rgba(158, 158, 158, 0.18)", color: "#616161" },
};

const isPathActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const hasActiveChild = (item: MenuItem, pathname: string): boolean => {
  if (!item.children?.length) return false;
  return item.children.some(
    (child) => isPathActive(pathname, child.href) || hasActiveChild(child, pathname)
  );
};

const NavItem = ({ item, depth = 0 }: NavItemProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const customizer = useAppSelector((state: RootState) => state.customizer);
  const isCollapsed = customizer.isCollapse || false;

  const Icon = item.icon as ElementType | undefined;
  const hasChildren = Boolean(item.children?.length);
  const selected = isPathActive(pathname, item.href);
  const childActive = hasActiveChild(item, pathname);
  const isActive = selected || childActive;

  const [open, setOpen] = useState(childActive || selected);
  const [hoverOpen, setHoverOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (childActive || selected) setOpen(true);
  }, [childActive, selected]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setHoverOpen(false), 120);
  };

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (hasChildren && !isCollapsed) {
      setOpen((prev) => !prev);
      return;
    }
    if (item.href) navigate(item.href);
  };

  const badgeStyles = useMemo(() => {
    const key = item.badgeColor || "default";
    return badgePalette[key];
  }, [item.badgeColor]);

  const itemButton = (
    <ListItemButton
      selected={isActive && !hasChildren}
      onClick={handleClick}
      sx={{
        borderRadius: 2.5,
        mb: 0.5,
        minHeight: 44,
        px: isCollapsed && depth === 0 ? 1 : 1.25,
        py: 1,
        justifyContent: isCollapsed && depth === 0 ? "center" : "flex-start",
        color: isActive ? "text.primary" : "text.secondary",
        bgcolor:
          isActive && (!hasChildren || isCollapsed)
            ? "action.selected"
            : hasChildren && open && !isCollapsed
              ? "action.hover"
              : "transparent",
        "&.Mui-selected": {
          bgcolor: "action.selected",
          "&:hover": { bgcolor: "action.selected" },
        },
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      {Icon && depth === 0 && (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isCollapsed ? 0 : 1.5,
            color: "text.primary",
            justifyContent: "center",
          }}
        >
          <Icon
            color="currentColor"
            size={22}
            variant={isActive ? "Bold" : "Broken"}
          />
        </ListItemIcon>
      )}

      {(!isCollapsed || depth > 0) && (
        <>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: depth > 0 ? 13.5 : 14,
              fontWeight: isActive ? 600 : 500,
              noWrap: true,
            }}
          />

          {item.badge != null && (
            <Chip
              label={item.badge}
              size="small"
              sx={{
                height: 22,
                minWidth: 22,
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 1.5,
                bgcolor: badgeStyles.bg,
                color: badgeStyles.color,
                "& .MuiChip-label": { px: 0.75 },
              }}
            />
          )}

          {hasChildren && !isCollapsed && (
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                ml: 0.5,
                color: "text.disabled",
              }}
            >
              {open ? (
                <ArrowUp2 size={14} color="currentColor" />
              ) : (
                <ArrowDown2 size={14} color="currentColor" />
              )}
            </Box>
          )}

          {depth > 0 && selected && (
            <ArrowRight2 size={14} color="currentColor" />
          )}
        </>
      )}
    </ListItemButton>
  );

  return (
    <Box
      ref={anchorRef}
      onMouseEnter={() => {
        if (isCollapsed && depth === 0) {
          clearCloseTimer();
          setHoverOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (isCollapsed && depth === 0) scheduleClose();
      }}
    >
      {isCollapsed && depth === 0 && !hasChildren ? (
        <Tooltip title={item.title} placement="right" arrow>
          {itemButton}
        </Tooltip>
      ) : (
        itemButton
      )}

      {!isCollapsed && hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            sx={{
              position: "relative",
              ml: 2.75,
              pl: 1.75,
              py: 0.25,
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 4,
                bottom: 10,
                width: "1px",
                bgcolor: "divider",
              },
            }}
          >
            {item.children?.map((child) => (
              <Box
                key={child.id}
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: -14,
                    top: 22,
                    width: 12,
                    height: "1px",
                    bgcolor: "divider",
                  },
                }}
              >
                <NavItem item={child} depth={depth + 1} />
              </Box>
            ))}
          </Box>
        </Collapse>
      )}

      {isCollapsed && depth === 0 && (
        <Popper
          open={hoverOpen}
          anchorEl={anchorRef.current}
          placement="right-start"
          modifiers={[
            { name: "offset", options: { offset: [0, 12] } },
            { name: "preventOverflow", options: { padding: 8 } },
          ]}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        >
          <Box
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Paper
              elevation={0}
              sx={{
                px: 1.25,
                py: 0.75,
                bgcolor: "grey.900",
                color: "common.white",
                borderRadius: 2,
                width: "fit-content",
              }}
            >
              <Typography variant="caption" fontWeight={600}>
                {item.title}
              </Typography>
            </Paper>

            {hasChildren && (
              <Paper
                elevation={8}
                sx={{
                  minWidth: 180,
                  p: 1,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    pl: 1.75,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 6,
                      top: 8,
                      bottom: 12,
                      width: "1px",
                      bgcolor: "divider",
                    },
                  }}
                >
                  {item.children?.map((child) => {
                    const childSelected = isPathActive(pathname, child.href);
                    return (
                      <Box
                        key={child.id}
                        sx={{
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: -8,
                            top: 20,
                            width: 10,
                            height: "1px",
                            bgcolor: "divider",
                          },
                        }}
                      >
                        <ListItemButton
                          selected={childSelected}
                          onClick={() => {
                            navigate(child.href);
                            setHoverOpen(false);
                          }}
                          sx={{
                            borderRadius: 2,
                            minHeight: 38,
                            mb: 0.25,
                            "&.Mui-selected": {
                              bgcolor: "action.selected",
                            },
                          }}
                        >
                          <ListItemText
                            primary={child.title}
                            primaryTypographyProps={{
                              fontSize: 13.5,
                              fontWeight: childSelected ? 600 : 500,
                            }}
                          />
                          {childSelected && (
                            <ArrowRight2 size={14} color="currentColor" />
                          )}
                        </ListItemButton>
                      </Box>
                    );
                  })}
                </Box>
              </Paper>
            )}
          </Box>
        </Popper>
      )}
    </Box>
  );
};

export default NavItem;
