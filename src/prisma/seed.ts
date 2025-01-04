import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = ["Functionality", "Bug", "UI", "Performance"];
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const statuses = ["Idea", "Planned", "In Progress", "Completed"];
  for (const name of statuses) {
    await prisma.status.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main()
  .then(() => {
    console.log("Seeding completed!");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
