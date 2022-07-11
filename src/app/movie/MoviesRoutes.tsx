import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { PageMovies } from '@/app/movie/PageMovies';
import { Error404 } from '@/errors';

const MoviesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageMovies />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default MoviesRoutes;