import { Request, Response, Server } from 'miragejs';

import { withAuth } from '@/mocks/auth';

export const CategoriesRoutes = (server: Server) => {
  server.get('/categories', getAll);
  server.get('/categories/:categoryId', getOneCategory);
};

const getAll = withAuth((schema: any, request: Request) => {
  const { page = 0, size = 40 } = request.queryParams;
  const start = Number(page) * Number(size);
  const end = start + Number(size);
  const categories = schema.all('category');

  return new Response(
    200,
    { 'x-total-count': categories.length.toString() },
    categories.slice(start, end)
  );
});

const getOneCategory = withAuth((schema: any, request: Request) => {
  const id = request.params.categoryId;
  const category = schema.where('category', { id }).models[0];
  if (!category) {
    return new Response(404);
  }
  return category;
});
