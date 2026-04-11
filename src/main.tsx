import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { HomePage } from '@/pages/HomePage';
import { CheckInPage } from '@/pages/CheckInPage';
import { FramesPage } from '@/pages/FramesPage';
import { CommitmentsPage } from '@/pages/CommitmentsPage';
import { InsightsPage } from '@/pages/InsightsPage';
import '@/index.css';
const queryClient = new QueryClient();
const Root = () => (
  <MobileLayout>
    <Outlet />
  </MobileLayout>
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/check-in", element: <CheckInPage /> },
      { path: "/frames", element: <FramesPage /> },
      { path: "/commitments", element: <CommitmentsPage /> },
      { path: "/insights", element: <InsightsPage /> },
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);