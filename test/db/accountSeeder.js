import Faker, { setSeedFaker } from './config/faker.js';
import Student from '../../src/models/student.model.js';
import Officer from '../../src/models/officer.model.js';
import fs from 'node:fs/promises';
import '../../src/index.js';

const seedStudent = (studentID) => {
  const firstName = Faker.person.firstName();
  const lastName = Faker.person.lastName();
  const fullName = firstName + ' ' + lastName;

  return {
    name: fullName,
    email: Faker.internet.email({
      firstName,
      lastName: lastName + Faker.string.uuid(),
      provider: 'hcmut.edu.vn'
    }),
    password: Faker.internet.password({ length: 8 }) + Faker.number.int(),
    role: 'user',
    isEmailVerified: false,
    studentID: studentID,
    department: Faker.helpers.arrayElement(['SE', 'CS', 'EE']),
    pageCount: Faker.number.int({ min: 0, max: 50 })
  };
};

const seedOfficer = () => {
  const firstName = Faker.person.firstName();
  const lastName = Faker.person.lastName();
  const fullName = firstName + ' ' + lastName;

  return {
    name: fullName,
    email: Faker.internet.email({
      firstName,
      lastName: lastName + Faker.string.uuid(),
      allowSpecialCharacters: true,
      provider: 'hcmut.edu.vn'
    }),
    password: Faker.internet.password({ length: 8 }) + Faker.number.int(),
    role: 'admin',
    isEmailVerified: false,
    officerID: Faker.string.uuid(),
    campus: Faker.helpers.arrayElement('CS2', 'CS1'),
    CCCD: Faker.string.uuid()
  };
};

// 10000 users
// 100 officers

// npm run account 1234

setSeedFaker(process.argv[2]);
console.log('Generating data with seed: ', process.argv[2]);

const studentDocs = [];
const students = [];
const officerDocs = [];
const officers = [];

const uniqueStudentIDs = Faker.helpers.uniqueArray(
  () => Faker.helpers.fromRegExp('2[0-4]1[0-9]{4}'),
  1000
);

for (let i = 0; i < 1000; i++) {
  const student = seedStudent(uniqueStudentIDs[i]);
  students.push(student);
  studentDocs.push(new Student(student));
}

for (let i = 0; i < 100; i++) {
  const officer = seedOfficer();
  officers.push(officer);
  officerDocs.push(new Officer(officer));
}

await fs.writeFile('test/dataset/student.json', JSON.stringify(students, null, 2));
await fs.writeFile('test/dataset/officer.json', JSON.stringify(officers, null, 2));
await Student.bulkSave(studentDocs);
await Officer.bulkSave(officerDocs);
console.log('Data generated successfully');
