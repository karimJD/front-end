import { Server } from 'miragejs';

export const movieSeeds = (server: Server<any>) => {
  server.createList('movie', 40);
};
