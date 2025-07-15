import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.employee.deleteMany()

  // Create sample employees
  const employees = [
    {
      employeeId: 'EMP001',
      name: 'John Doe',
      attitude: 8,
      smartness: 9,
      productivity: 8,
      communication: 7,
      teamwork: 9,
    },
    {
      employeeId: 'EMP002',
      name: 'Jane Smith',
      attitude: 9,
      smartness: 8,
      productivity: 9,
      communication: 8,
      teamwork: 7,
    },
    {
      employeeId: 'EMP003',
      name: 'Mike Johnson',
      attitude: 7,
      smartness: 7,
      productivity: 8,
      communication: 6,
      teamwork: 8,
    },
    {
      employeeId: 'EMP004',
      name: 'Sarah Wilson',
      attitude: 8,
      smartness: 9,
      productivity: 7,
      communication: 9,
      teamwork: 8,
    },
    {
      employeeId: 'EMP005',
      name: 'David Brown',
      attitude: 6,
      smartness: 8,
      productivity: 6,
      communication: 7,
      teamwork: 6,
    },
  ]

  for (const employee of employees) {
    await prisma.employee.create({
      data: employee,
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 