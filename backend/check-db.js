const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();
  try {
    const tables = await prisma.$queryRawUnsafe(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = $1 ORDER BY table_name`,
      "public",
    );
    console.log("TABLES");
    console.log(JSON.stringify(tables, null, 2));

    const about = await prisma.$queryRawUnsafe(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 ORDER BY ordinal_position`,
      "public",
      "About",
    );
    console.log("ABOUT_COLUMNS");
    console.log(JSON.stringify(about, null, 2));

    const contact = await prisma.$queryRawUnsafe(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 ORDER BY ordinal_position`,
      "public",
      "Contact",
    );
    console.log("CONTACT_COLUMNS");
    console.log(JSON.stringify(contact, null, 2));

    const cv = await prisma.$queryRawUnsafe(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 ORDER BY ordinal_position`,
      "public",
      "CurriculumVitae",
    );
    console.log("CV_COLUMNS");
    console.log(JSON.stringify(cv, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
