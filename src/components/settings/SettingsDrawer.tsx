import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  Chip,
} from "@mui/material";
import { CloseSquare, Sun, Moon, ColorSwatch,Monitor } from "iconsax-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTheme, setDarkMode } from "@/store/custom/customizerSlice";

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SettingsDrawer = ({ open, onClose }: SettingsDrawerProps) => {
  const dispatch = useAppDispatch();
  const { activeMode, activeTheme } = useAppSelector((state) => state.customizer);

  const handleModeChange = (mode: 'light' | 'dark' | 'system') => {
    dispatch(setDarkMode(mode));
    sessionStorage.setItem('mode', mode);
  };

  const handleThemeChange = (theme: 'BLUE_THEME' | 'PURPLE_THEME' | 'PINK_THEME') => {
    dispatch(setTheme(theme));
    sessionStorage.setItem('theme', theme);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 320,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Settings
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseSquare size={20} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Theme Mode */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2,color:'primary.main' }}>
              <Sun variant="Bulk" size={20} color="currentColor" />
              <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 600 }}>
                Theme Mode
              </Typography>
            </Box>
            <ButtonGroup size="small" fullWidth>
              <Button
                variant={activeMode === 'light' ? 'contained' : 'outlined'}
                onClick={() => handleModeChange('light')}
                startIcon={<Sun color="currentColor" variant="Bulk"   size={16} />}
              >
                Light
              </Button>
              <Button
                variant={activeMode === 'dark' ? 'contained' : 'outlined'}
                onClick={() => handleModeChange('dark')}
                startIcon={<Moon color="currentColor" variant="Bulk"  size={16} />}
              >
                Dark
              </Button>
              <Button
                variant={activeMode === 'system' ? 'contained' : 'outlined'}
                onClick={() => handleModeChange('system')}
                startIcon={<Monitor color="currentColor" variant="Bulk"  size={16} />}
              >
                System
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        {/* Theme Color */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 ,color:'primary.main'}}>
              <ColorSwatch variant="Bulk" size={20} color="currentColor" />
              <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 600 }}>
                Theme Color
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="Blue"
                onClick={() => handleThemeChange('BLUE_THEME')}
                variant={activeTheme === 'BLUE_THEME' ? 'filled' : 'outlined'}
                color="primary"
                sx={{ 
                  color: activeTheme === 'BLUE_THEME' ? 'white' : '#1976d2',
                  borderColor: '#1976d2'
                }}
              />
              <Chip
                label="Purple"
                onClick={() => handleThemeChange('PURPLE_THEME')}
                variant={activeTheme === 'PURPLE_THEME' ? 'filled' : 'outlined'}
                color="primary"
                sx={{ 
                  color: activeTheme === 'PURPLE_THEME' ? 'white' : '#9c27b0',
                  borderColor: '#9c27b0'
                }}
              />
              <Chip
                label="Pink"
                onClick={() => handleThemeChange('PINK_THEME')}
                variant={activeTheme === 'PINK_THEME' ? 'filled' : 'outlined'}
                color="primary"
                sx={{ 
                  color: activeTheme === 'PINK_THEME' ? 'white' : '#E91E63',
                  borderColor: '#E91E63'
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;