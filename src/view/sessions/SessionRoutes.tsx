/* eslint-disable react-refresh/only-export-components */
import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));

const sessionRoutes = [
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;
