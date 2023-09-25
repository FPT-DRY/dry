import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: 'john.doe@prisma.io',
    },
    update: {},
    create: {
      username: 'john.doe',
      password: '$2a$07$FGBp3ilWdjWKiFGZEaFun.QD.VvBHuQ79t8hf6gzgNsBy510pf/iy', //123456Abc
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
      password: '$2a$07$RpN5otfwBAO6GVUmxq8X/e7Hh14PjtmMhGaAMFODNnrNsgc4vFBfW', //Abc123456
      name: 'Mary Jane',
      email: 'mary.jane@prisma.io',
      image: null,
    },
  });

  await prisma.category.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Action' },
      { name: 'Adventure' },
      { name: 'Comedy' },
      { name: 'Drama' },
      { name: 'Fantasy' },
      { name: 'Horror' },
      { name: 'Historical' },
      { name: 'Mistery' },
      { name: 'Shounen' },
      { name: 'Shoujo' },
      { name: 'Romantic' },
    ],
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect;
    process.exit;
  });
