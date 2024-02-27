import { Navigate } from 'react-router-dom';
import sessionRoutes from './view/sessions/SessionRoutes';
import { MatxLayout } from './components';
import dashboardRoutes from './view/dashboard/DashboardRoutes';
import AuthGuard from './auth/AuthGuard';

export const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes,],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="/dashboard" /> }
];
