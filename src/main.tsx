import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
declare global {
  interface Window {
    _assataRoot: ReturnType<typeof createRoot> | null;
  }
}
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { HomePage } from '@/pages/HomePage';
import { CheckInPage } from '@/pages/CheckInPage';
import { FramesPage } from '@/pages/FramesPage';
import { CommitmentsPage } from '@/pages/CommitmentsPage';
import { InsightsPage } from '@/pages/InsightsPage';
import { LedgerPage } from '@/pages/LedgerPage';
import { useStore } from '@/lib/store';
import '@/index.css';
const DEFAULT_NARRATIVE = `2026 STRATEGIC NARRATIVE: I am transitioning into a season of deep structural clarity. My leadership is characterized by the Architect's precision and the Nurturer's heart. In 2026, I will focus on sustainable growth, prioritizing relational depth over transactional speed. My worth is inherent, not earned through exhaustion.`;
const queryClient = new QueryClient();
export function Root() {
  const narrative = useStore(s => s.journals.narrative);
  const updateNarrative = useStore(s => s.updateNarrative);
  useEffect(() => {
    if (!narrative) {
      updateNarrative(DEFAULT_NARRATIVE);
    }
  }, [narrative, updateNarrative]);
  return (
    <MobileLayout>
      <Outlet />
    </MobileLayout>
  );
}
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
      { path: "/ledger", element: <LedgerPage /> },
      { path: "/insights", element: <InsightsPage /> },
    ]
  },
]);
const container = document.getElementById('root');
if (container) {
  let root = window._assataRoot;
  if (!root) {
    root = window._assataRoot = createRoot(container);
  }
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </ErrorBoundary>
      </QueryClientProvider>
    </React.StrictMode>
  );
}