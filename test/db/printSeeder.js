import Faker, { setSeedFaker } from './config/faker.js';
import PrintingLog from '../../src/models/printingLog.model.js';
import TransactionLog from '../../src/models/transactionLog.model.js';
import SupportTicket from '../../src/models/supportTicket.model.js';
import Printer from '../../src/models/printer.model.js';
import Student from '../../src/models/student.model.js';
import Officer from '../../src/models/officer.model.js';
import uploadFile from '../../src/models/uploadFile.model.js';
import '../../src/index.js';
import path from 'path';

// for each user
// printer random
// 1 user -> 2 logs -> 2 - 3 files

const students = await Student.find({}, '_id, pageCount');
const printers = await Printer.find({}, '_id');
const officer = await Officer.find({}, '_id');

async function seedFile(date, status) {
  return await new uploadFile({
    fileName: path.parse(Faker.system.fileName()).base,
    fileType: Faker.helpers.arrayElement(['pdf', 'docx', 'pptx']),
    pageSize: Faker.helpers.arrayElement(['A4', 'A3', 'A5']),
    pageCount: Faker.number.int({ min: 1, max: 20 }),
    printed: status === 'success',
    dateUploaded: date
  }).save();
}

async function seedPrintingLog(user, printer) {
  const status = Faker.helpers.arrayElement(['success', 'failure']);
  const date = Faker.date.recent();
  const files = [];
  for (let i = 0; i < Faker.number.int({ min: 1, max: 2 }); i++) {
    files.push(await seedFile(date, status));
  }
  const printCount = files.reduce((acc, file) => acc + file.pageCount, 0);
  const supportTicketID =
    status === 'success' ? null : (await seedSupportTicket(user, printer))._id;
  if (user.pageCount < printCount) {
    await Student.findByIdAndUpdate(user._id, { pageCount: 0 });
    user.pageCount = 0;
    await seedTransactionLog(user, printCount - user.pageCount, date);
  }

  return await new PrintingLog({
    user: user._id,
    printer: printer._id,
    date,
    printingFile: files.map((file) => file._id),
    status,
    color: Faker.datatype.boolean(),
    printType: Faker.helpers.arrayElement(['single-sided', 'double-sided']),
    printCount,
    supportTicketID,
    totalCost: printCount * 500
  }).save();
}

async function seedTransactionLog(user, pageCount, date) {
  if (Faker.datatype.boolean()) {
    await new TransactionLog({
      studentID: user._id,
      transactionID: Faker.string.uuid(),
      pageCount,
      money: pageCount * 500,
      createDate: date,
      completed: false,
      ipAddr: Faker.internet.ip()
    }).save();
  }

  return await new TransactionLog({
    studentID: user._id,
    transactionID: Faker.string.uuid(),
    pageCount,
    money: pageCount * 500,
    createDate: date,
    completed: true,
    ipAddr: Faker.internet.ip()
  }).save();
}

async function seedSupportTicket(user, printer) {
  const status = Faker.helpers.arrayElement(['open', 'closed']);
  const createdAt = Faker.date.recent();
  const closedAt =
    status === 'open'
      ? null
      : new Date(createdAt).setDate(createdAt.getDate() + Faker.number.int({ min: 1, max: 7 }));

  return await new SupportTicket({
    student: user._id,
    printer: printer._id,
    officer:
      status === 'closed'
        ? officer[Faker.number.int({ min: 0, max: officer.length - 1 })]._id
        : null,
    description: Faker.helpers.arrayElement(['Kẹt giấy', 'In giấy lỗi', 'Máy hỏng', 'Hết mực']),
    response: status === 'closed' ? 'Đã sửa chữa' : null,
    status,
    createdAt,
    closedAt
  }).save();
}

setSeedFaker(process.argv[2]);
console.log('Generating data with seed: ', process.argv[2]);

students.forEach((student) => {
  seedPrintingLog(student, printers[Faker.number.int({ min: 0, max: printers.length - 1 })]);
  seedPrintingLog(student, printers[Faker.number.int({ min: 0, max: printers.length - 1 })]);
});
