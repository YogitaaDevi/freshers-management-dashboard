import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.assessmentResult.deleteMany()
  await prisma.employeeParameter.deleteMany()
  await prisma.assessment.deleteMany()
  await prisma.parameter.deleteMany()
  await prisma.employee.deleteMany()

  // Create admin user (madan)
  const hashedPassword = await bcrypt.hash('1234', 12)
  const adminUser = await prisma.employee.create({
    data: {
      name: 'madan',
      email: 'madan@yopmail.com',
      password: hashedPassword,
      isAdmin: true,
    },
  })

  // Create sample employees
  const employees = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 12),
      isAdmin: false,
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: await bcrypt.hash('password123', 12),
      isAdmin: false,
    },
    {
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      password: await bcrypt.hash('password123', 12),
      isAdmin: false,
    },
  ]

  const createdEmployees = []
  for (const employee of employees) {
    const created = await prisma.employee.create({
      data: employee,
    })
    createdEmployees.push(created)
  }

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user created: ${adminUser.email}`)
  console.log(`👥 ${createdEmployees.length} employees created`)
  console.log(`📊 Parameters table: Empty (to be created via application)`)
  console.log(`📝 Assessments table: Empty (to be created via application)`)
  console.log(`🔗 Employee-Parameter relationships: Empty (to be created via application)`)
  console.log(`📊 Assessment Results: Empty (to be created via application)`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 