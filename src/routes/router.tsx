import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';
import Loadable from '@/layouts/shared/loadable/Loadable';

const Login = Loadable(lazy(() => import('@/pages/auth/login-page/LoginPage')));
const Dashboard = Loadable(lazy(() => import('@/pages/main/dashboard-page/DashboardPage')));
const NotFound = Loadable(lazy(() => import('@/pages/error/404')));

const Router = [
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/404', element: <NotFound /> },
    ],
  },
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/login" /> },
    ],
  },
];

export default Router;
