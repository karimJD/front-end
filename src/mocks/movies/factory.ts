import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

export const MovieFactory = Factory.extend({
  title: (): string => faker.music.genre(),
  duration: (): number => faker.datatype.number(),
  ageLimit: (): number => faker.datatype.number(),
  description: (): string => faker.lorem.paragraph(),
  actors: (): string => faker.name.firstName(),
  releaseDate: (): Date => faker.date.future(),
  image: (): string => '',
});
