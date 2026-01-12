import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import AuthLayout from './pages/auth/AuthLayout.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';

import { Navigate } from "react-router-dom";
import { useAuth } from './hooks/useAuth.ts';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Gastos from './pages/gastos/Gastos.tsx';
import Ventas from './pages/ventas/Ventas.tsx';

export const PrivateRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export const PublicRoute = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "gastos", element: <Gastos /> },
          { path: "ventas", element: <Ventas /> },
        ]
      }
    ]
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      {
        path: "/auth", element: <AuthLayout />, children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ]
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
