import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: "demo@driven.com.br" }
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("demo123", 10);

    await prisma.user.create({
      data: {
        name: "Demo",
        email: "demo@driven.com.br",
        password: hashedPassword
      }
    });

    console.log(" Usuário demo criado com sucesso!");
  } else {
    console.log("ℹ Usuário demo já existe");
  }
}

main()
  .catch((e) => {
    console.error("Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
