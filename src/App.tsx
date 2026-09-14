
import { ThemeProvider } from '@mui/material/styles';
import './App.css'
import { useTheme } from './hooks/useTheme';
import { CssBaseline } from '@mui/material';
import { HashRouter, useRoutes } from 'react-router-dom';
import Router from "./routes/router";
import ToastProvider from './context/snackbar/ToastProvider';

const AppRoutes = () => {
  const routing = useRoutes(Router);
  return routing;
};

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CssBaseline />
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
