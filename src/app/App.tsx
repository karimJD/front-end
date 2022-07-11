import React, { Suspense } from 'react';

import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { PageLogin } from '@/app/auth/PageLogin';
import { PageLogout } from '@/app/auth/PageLogout';
import { Layout, Loader } from '@/app/layout';
import {
  AdminRouteGuard,
  AuthenticatedRouteGuard,
  PublicOnlyRouteGuard,
} from '@/app/router/guards';
import { Error404, ErrorBoundary } from '@/errors';
import MoviesRoutes from './movie/MoviesRoutes';

const AdminRoutes = React.lazy(() => import('@/app/admin/AdminRoutes'));
const AccountRoutes = React.lazy(() => import('@/app/account/AccountRoutes'));


export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app">
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/movie" replace />} />

           {/*    <Route
                path="login"
                element={
                  <PublicOnlyRouteGuard>
                    <PageLogin />
                  </PublicOnlyRouteGuard>
                }
              />
              */}
              <Route
                path="logout"
                element={
                  <ErrorBoundary>
                    <PageLogout />
                  </ErrorBoundary>
                }
              />

              <Route
                path="account/*"
                element={
                  <ErrorBoundary>
                    <AccountRoutes />
                  </ErrorBoundary>
                }
              />

              <Route
                path="movie/*"
                element={
                  // <AuthenticatedRouteGuard>
                    <MoviesRoutes />
                  // </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="admin/*"
                element={
                  <AdminRouteGuard>
                    <AdminRoutes />
                  </AdminRouteGuard>
                }
              />

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};
