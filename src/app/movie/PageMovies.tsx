import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Page, PageContent } from '@/app/layout';
import { MoviesList } from '@/app/movie/MoviesList';

import { MovieNav } from './MovieNav';

export const PageMovies = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<number>();

  return (
    <Page containerSize="xl" nav={<MovieNav setCategoryId={setCategoryId} />}>
      <PageContent>
        <MoviesList
          categoryId={categoryId}
          onMovieClick={(id) => navigate('/movies/' + id)}
        />
      </PageContent>
    </Page>
  );
};
