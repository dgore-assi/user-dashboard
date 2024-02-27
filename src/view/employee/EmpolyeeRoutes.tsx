/* eslint-disable react-refresh/only-export-components */
import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const EmployeeDetails = Loadable(lazy(() => import('./EmployeeDetails')));

const dashboardRoutes = [
  { path: '/dashboard', element: <EmployeeDetails /> },
];

export default dashboardRoutes;
