import prisma from "../lib/prisma";

async function main() {
  const response = await Promise.all([
    prisma.contract.upsert({
      where: { address: "123testADDR" },
      update: {},
      create: {
        address: "123testADDR",
        name: "Test Contract1",
        author: "Author1",
        image: "/next.svg",
      },
    }),
  ]);
  console.log(response);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
