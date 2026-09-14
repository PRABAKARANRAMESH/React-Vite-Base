// ToastProvider.tsx
import React from 'react';
import { Snackbar, Alert,  } from '@mui/material';
import { setToastHandler } from '@/service/axios-instance';

interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = React.useState<ToastState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showToast = React.useCallback((message: string, severity: ToastState['severity'] = 'info') => {
    setToast({ open: true, message, severity });
  }, []);

  const hideToast = React.useCallback(() => {
    setToast(prev => ({ ...prev, open: false }));
  }, []);

  // Set global toast handler
  React.useEffect(() => {
    setToastHandler(showToast);
  }, [showToast]);

  return (
    <>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={hideToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={hideToast} 
          severity={toast.severity}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastProvider;