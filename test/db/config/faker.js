import { fakerVI as Faker } from '@faker-js/faker';

// default seed = 123
export const setSeedFaker = (seed = 123) => {
  seed = Number(seed);
  Faker.seed(seed);
};

export default Faker;
