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
  const [movieId, setMovieId] = useState();
  const [categoryId, setCategoryId] = useState(0);
  const [isCalled, setIsCalled] = useState(false); // To check if the movies list box is called

  return (
    <Page
      containerSize="xl"
      nav={<MovieNav setCategoryId={setCategoryId} setIsCalled={setIsCalled} />}
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
          {isCalled ? (
            <MoviesListBox categoryId={categoryId} setMovieId={setMovieId} />
          ) : null}
        </React.Suspense>
      </PageContent>
    </Page>
  );
};
