import React, { useState } from 'react';

import { Center, CircularProgress } from '@chakra-ui/react';

import { Page, PageContent } from '@/app/layout';
import { MovieBanner } from '@/app/movie/MovieBanner';

import { MovieNav } from './MovieNav';

const MoviesListBox = React.lazy(() =>
  import('@/app/movie/MoviesListBox').then(({ MoviesListBox }) => ({
    default: MoviesListBox,
  }))
);

export const PageMovies = () => {
  const [movieId, setMovieId] = useState<number | undefined>();
  const [categoryId, setCategoryId] = useState(0);
  const [showMovies, setShowMovies] = useState(false); // To check if the movies list box is called

  return (
    <Page
      containerSize="xl"
      nav={
        <MovieNav setCategoryId={setCategoryId} setShowMovies={setShowMovies} />
      }
    >
      <PageContent>
        <MovieBanner movieId={movieId} />
        <React.Suspense
          fallback={
            <Center>
              <CircularProgress isIndeterminate color="green.300" />{' '}
            </Center>
          }
        >
          {showMovies ? (
            <MoviesListBox categoryId={categoryId} setMovieId={setMovieId} />
          ) : null}
        </React.Suspense>
      </PageContent>
    </Page>
  );
};
