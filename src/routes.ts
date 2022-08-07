import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/BasicLayout';
import NotFound from '@/pages/NotFound';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const notFound = lazy(() => import('@/pages/NotFound'));
const AdminManager = lazy(() => import('@/pages/AdminManager'));
const Home = lazy(() => import('@/pages/Home'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/admin', component: AdminManager },
      { path: '/notFound', component: notFound },
      { path: '/', exact: true, component: Home },
    ],
  },
];

export default routerConfig;
