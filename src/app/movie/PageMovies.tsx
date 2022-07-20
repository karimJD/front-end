import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Page, PageContent } from '@/app/layout';
import { MoviesListBox } from '@/app/movie/MoviesListBox';

import { MovieNav } from './MovieNav';

export const PageMovies = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<number>();

  return (
    <Page containerSize="xl" nav={<MovieNav setCategoryId={setCategoryId} />}>
      <PageContent>
        <MoviesListBox
          categoryId={categoryId}
          onMovieClick={(id) => navigate('/movies/' + id)}
        />
      </PageContent>
    </Page>
  );
};
