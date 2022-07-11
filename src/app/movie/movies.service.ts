import Axios, { AxiosError } from 'axios';
import {
  UseQueryOptions,
  useQuery
} from 'react-query';

import { MovieList } from '@/app/movie/movies.types';

let token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTY1NzYxMDAyOX0.P4kxaBEDTtWjd93aPdl3XXzGYVRbbpLybpFsSkm2uF7RQ6kPK9PdrWNkb8ln-6YHnjltBt-RBu5YmcY1-NbADQ';

const moviesKeys = {
  all: () => ['moviesService'] as const,
  movies: () =>
    [...moviesKeys.all(), 'movies' ] as const,
  movie: () =>
    [...moviesKeys.all(), 'movie'] as const,
};

export const useMoviesList = (
  config: UseQueryOptions<
    MovieList,
    AxiosError,
    MovieList,
    InferQueryKey<typeof moviesKeys.movies>
  > = {}
) => {
  const result = useQuery(
    moviesKeys.movies(),
    (): Promise<MovieList> =>
      Axios.get('http://localhost:8080/api/movies', { headers: {"Authorization" : token} }),
    {
      keepPreviousData: true,
      ...config,
    }
  );
  
  const { content: movies, totalItems } = result.data || {};
  const isLoadingPage = result.isFetching;

  return {
    movies,
    totalItems,
    isLoadingPage,
    ...result,
  };
};

