import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const categories = [
  'Food',
  'Leisure',
  'Transport',
  'Health',
  'Housing',
  'Education',
  'Subscriptions',
  'Groceries',
  'Travel',
  'Other',
];

async function main() {
  console.log('Limpando despesas antigas...');
  await prisma.expense.deleteMany();

  const expenses = Array.from({ length: 30 }).map(() => ({
    title: faker.commerce.productName(),
    amount: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
    category: faker.helpers.arrayElement(categories),
    date: faker.date.between({
      from: new Date('2025-05-01T00:00:00.000Z'),
      to: new Date('2025-05-30T23:59:59.999Z'),
    }),
  }));

  try {
    await prisma.expense.createMany({ data: expenses });
    console.log('Seed concluído!');
  } catch (error) {
    console.error('Erro ao criar despesas:', error);
  }
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
