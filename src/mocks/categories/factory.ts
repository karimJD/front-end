import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

export const CategoryFactory = Factory.extend({
  name: (): string => faker.music.genre(),
});
