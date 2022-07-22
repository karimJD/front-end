import { Server } from 'miragejs';

export const categorySeeds = (server: Server<any>) => {
  server.createList('category', 5);
};
