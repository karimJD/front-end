import { Model, Serializer, belongsTo, createServer, hasMany } from 'miragejs';

import { MovieFactory } from '@/mocks/movies/factory';
import { movieSeeds } from '@/mocks/movies/seeds';

import { AccountRoutes } from './account';
import { AuthRoutes } from './auth';
import { CategoriesRoutes } from './categories';
import { CategoryFactory } from './categories/factory';
import { categorySeeds } from './categories/seeds';
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
      movie: Model.extend({
        categories: hasMany('category'),
      }),
      category: Model.extend({
        movies: belongsTo('movie'),
      }),
    },

    factories: {
      user: UserFactory,
      movie: MovieFactory,
      category: CategoryFactory,
    },

    seeds(server) {
      userSeeds(server);
      movieSeeds(server);
      categorySeeds(server);
    },

    routes() {
      this.namespace = '/api';

      AuthRoutes(this);
      UsersRoutes(this);
      AccountRoutes(this);
      MoviesRoutes(this);
      CategoriesRoutes(this);

      this.namespace = '/';
      this.passthrough();
    },
  });
};
