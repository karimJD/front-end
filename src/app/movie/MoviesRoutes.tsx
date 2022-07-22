import { Flex } from '@chakra-ui/react';
import { Route, Routes, useParams } from 'react-router-dom';

import { MovieBanner } from '@/app/movie/MovieBanner';
import { PageMovies } from '@/app/movie/PageMovies';
import { AuthenticatedRouteGuard } from '@/app/router/guards';
import { Error404 } from '@/errors';

const PageMovieDetail = () => {
  const { movieId } = useParams();
  return (
    <Flex flex="1">
      <MovieBanner movieId={movieId} />
    </Flex>
  );
};

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
      <Route
        path=":movieId"
        element={
          <AuthenticatedRouteGuard>
            <PageMovieDetail />
          </AuthenticatedRouteGuard>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default MoviesRoutes;
