import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { PageMovies } from '@/app/movie/PageMovies';
import { AuthenticatedRouteGuard } from '@/app/router/guards';
import { Error404 } from '@/errors';

const MoviesRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthenticatedRouteGuard>
            <PageMovies />
          </AuthenticatedRouteGuard>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default MoviesRoutes;
