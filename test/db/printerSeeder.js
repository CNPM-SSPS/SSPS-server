import Faker, { setSeedFaker } from './config/faker.js';
import Printer from '../../src/models/printer.model.js';
import '../../src/index.js';

export const seedPrinter = () => {
  const campus = Faker.helpers.arrayElement(['CS1', 'CS2']);
  const building =
    campus == 'CS2'
      ? Faker.helpers.arrayElement(['H1', 'H2', 'H3', 'H6'])
      : Faker.helpers.arrayElement(['A1', 'A2', 'A3']);
  const deleted = Faker.datatype.boolean([0.95, 0.05]);
  const enabled = deleted ? false : Faker.datatype.boolean([0.85, 0.15]);

  return {
    room: String(
      Faker.number.int({ min: 1, max: 8 }) * 100 + Faker.number.int({ min: 1, max: 10 })
    ),
    building: building,
    campus: campus,
    description: 'Máy in nhập khẩu từ ' + Faker.location.country(),
    model: Faker.system.semver(),
    brand: Faker.company.name(),
    enabled: enabled,
    deleted: deleted,
    dateAdded: Faker.date.past(),
    lastModified: Date.now()
  };
};

// 20 printers probably

setSeedFaker(process.argv[2]);

console.log('Generating data with seed: ', process.argv[2]);

const printerDocs = [];
for (let i = 0; i < 20; i++) {
  printerDocs.push(new Printer(seedPrinter()));
}

await Printer.bulkSave(printerDocs);
