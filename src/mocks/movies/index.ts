import { Request, Response, Server } from 'miragejs';

import { withAuth } from '@/mocks/auth';

export const MoviesRoutes = (server: Server) => {
  server.get('/movies', getAll);
};

const getAll = withAuth((schema: any, request: Request) => {
  const { page = 0, size = 10 } = request.queryParams;
  const start = Number(page) * Number(size);
  const end = start + Number(size);
  const movies = schema.all('movie');

  return new Response(
    200,
    { 'x-total-count': movies.length.toString() },
    movies.slice(start, end)
  );
});
