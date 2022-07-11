import React, { useState } from 'react';

import { MovieNav } from './MovieNav'; 
import { Page, PageContent } from '@/app/layout';
import { MoviesListBox } from '@/app/movie/MoviesListBox';
import { MovieBanner } from '@/app/movie/MovieBanner';


export const PageMovies = () => {

  const [movieId, setMovieId ] = useState(-1);
  const [categoryId, setCategoryId] = useState(1);

  return (
    <Page containerSize="xl" nav={<MovieNav setCategoryId={setCategoryId}/>}>
      <PageContent>
        <MovieBanner movieId={movieId}/>
        <MoviesListBox categoryId={categoryId} setMovieId={setMovieId}/>
      </PageContent>
    </Page>
  );
};
