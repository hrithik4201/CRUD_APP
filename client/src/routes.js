import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements([<Route path='/' element={<RootLayout />} />])
);

export default router;
