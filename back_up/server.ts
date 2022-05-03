import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const post = await prisma.user.create({
    data: {
      name: "Jean",
      role: "USER",
      createdAt: "",
      lastLoginAt: "",
    },
  });
  console.log(post);
}

main()