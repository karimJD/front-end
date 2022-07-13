import Axios, { AxiosError } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import { MovieList } from '@/app/movie/movies.types';

const moviesKeys = {
  all: () => ['moviesService'] as const,
  movies: () => [...moviesKeys.all(), 'movies'] as const,
  movie: () => [...moviesKeys.all(), 'movie'] as const,
};

export const useMoviesList = (
  config: UseQueryOptions<
    MovieList,
    AxiosError,
    MovieList,
    InferQueryKey<typeof moviesKeys.movies>
  > = {}
) => {
  return useQuery(
    moviesKeys.movies(),
    (): Promise<MovieList> => Axios.get('/api/movies'),
    {
      keepPreviousData: true,
      ...config,
    }
  );
};
