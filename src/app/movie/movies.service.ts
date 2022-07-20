import Axios, { AxiosError } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import { Movie, MovieList } from '@/app/movie/movies.types';

const moviesKeys = {
  all: () => ['moviesService'] as const,
  movies: () => [...moviesKeys.all(), 'movies'] as const,
  movie: ({ id }: { id?: number }) =>
    [...moviesKeys.all(), 'movie', { id }] as const,
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
    (): Promise<MovieList> => Axios.get('/movies'),
    {
      keepPreviousData: true,
      ...config,
    }
  );
};

export const useMovie = (
  movieId?: number,
  config: UseQueryOptions<
    Movie,
    AxiosError,
    Movie,
    InferQueryKey<typeof moviesKeys.movie>
  > = {}
) => {
  const result = useQuery(
    moviesKeys.movie({ id: movieId }),
    (): Promise<Movie> => Axios.get(`/movies/${movieId}`),
    {
      enabled: !!movieId,
      ...config,
    }
  );
  return {
    movie: result.data,
    ...result,
  };
};
