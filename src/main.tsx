import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Spinner from './layouts/shared/spinner/Spinner.tsx';
import { UserProvider } from './context/user-context/user-context.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserProvider>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </UserProvider>
      </Provider>
    </QueryClientProvider>
  </HelmetProvider>
);
