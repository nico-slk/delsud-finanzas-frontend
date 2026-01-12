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
          { path: "intereses", element: <p>Sarasa</p> },
          { path: "print", element: <p>Sarasa</p> },
          { path: "calcular-distancia-wt", element: <p>Sarasa</p> },
          { path: "contador-letras", element: <p>Sarasa</p> },
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
