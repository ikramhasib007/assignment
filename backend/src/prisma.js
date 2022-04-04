import { PrismaClient } from '@prisma/client';

const prismaConfig = {
  rejectOnNotFound: {
    findUnique: {
      Calculation: err => new Error('Calculation error!'),
    },
    findFirst: {
      Calculation: err => new Error('Calculation error!'),
    },
  }
}

let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(prismaConfig)
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(prismaConfig)
  }
  prisma = global.prisma
}

export default prisma