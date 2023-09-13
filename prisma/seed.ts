import prisma from '@lib/prisma';

async function main() {
  await prisma.user.upsert({
    where: {
      email: 'john.doe@prisma.io',
    },
    update: {},
    create: {
      username: 'john.doe',
      password: '123456Abc',
      name: 'John Doe',
      email: 'john.doe@prisma.io',
      image: null,
    },
  });

  await prisma.user.upsert({
    where: {
      email: 'mary.jane@prisma.io',
    },
    update: {},
    create: {
      username: 'mary.jane',
      password: 'Abc123456',
      name: 'Mary Jane',
      email: 'mary.jane@prisma.io',
      image: null,
    },
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect;
    process.exit;
  });
