import { Request, Response, Server } from 'miragejs';

import { withAuth } from '@/mocks/auth';

export const MoviesRoutes = (server: Server) => {
  server.get('/movies', getAll);
  server.get('/movies/:movieId', getOneMovie);
};

const getAll = withAuth((schema: any, request: Request) => {
  const { page = 0, size = 40 } = request.queryParams;
  const start = Number(page) * Number(size);
  const end = start + Number(size);
  const movies = schema.all('movie');

  return new Response(
    200,
    { 'x-total-count': movies.length.toString() },
    movies.slice(start, end)
  );
});

const getOneMovie = withAuth((schema: any, request: Request) => {
  const id = request.params.movieId;
  const movie = schema.where('movie', { id }).models[0];
  if (!movie) {
    return new Response(404);
  }
  return movie;
});
