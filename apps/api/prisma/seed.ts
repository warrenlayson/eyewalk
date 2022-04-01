import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password:
        '$argon2i$v=19$m=16,t=2,p=1$UWo4Z21Xem1mRFdvYzdXMw$9kvBTc+TMKD0qJ4DKhvJdA',
      firstName: 'admin',
      lastName: 'admin',
    },
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
