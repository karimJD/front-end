import { Model, Serializer, createServer } from 'miragejs';

import { MovieFactory } from '@/mocks/movies/factory';
import { movieSeeds } from '@/mocks/movies/seeds';

import { AccountRoutes } from './account';
import { AuthRoutes } from './auth';
import { MoviesRoutes } from './movies';
import { UsersRoutes } from './users';
import { UserFactory } from './users/factory';
import { userSeeds } from './users/seeds';

const AppSerializer = Serializer.extend({
  embed: true,
  root: false,
});

export const mockServer = () => {
  return createServer({
    serializers: {
      application: AppSerializer,
    },

    models: {
      user: Model.extend({}),
      movie: Model.extend({}),
    },

    factories: {
      user: UserFactory,
      movie: MovieFactory,
    },

    seeds(server) {
      userSeeds(server);
      movieSeeds(server);
    },

    routes() {
      this.namespace = '/api';

      AuthRoutes(this);
      UsersRoutes(this);
      AccountRoutes(this);
      MoviesRoutes(this);

      this.namespace = '/';
      this.passthrough();
    },
  });
};
