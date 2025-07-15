# Freshers Management Dashboard

A comprehensive Next.js application for managing freshers with both frontend and backend functionality, built with TypeScript, Tailwind CSS, PostgreSQL, and Prisma ORM.

## Features

- **Employee Management**: Add, edit, delete, and view employee records
- **Performance Tracking**: Track attitude, smartness, productivity, communication, and teamwork
- **Analytics Dashboard**: View employee statistics and top performers
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Type Safety**: Full TypeScript support throughout the application
- **Database**: PostgreSQL with Prisma ORM for robust data management

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Development**: ESLint, PostCSS, Autoprefixer

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd freshers-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/freshers_dashboard?schema=public"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following Employee model:

```prisma
model Employee {
  id           String   @id @default(cuid())
  employeeId   String   @unique
  name         String
  attitude     Int      @default(0) // Rating from 1-10
  smartness    Int      @default(0) // Rating from 1-10
  productivity Int      @default(0) // Rating from 1-10
  communication Int     @default(0) // Rating from 1-10
  teamwork     Int      @default(0) // Rating from 1-10
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("employees")
}
```

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create a new employee
- `GET /api/employees/[id]` - Get employee by ID
- `PUT /api/employees/[id]` - Update employee
- `DELETE /api/employees/[id]` - Delete employee

### Statistics
- `GET /api/employees/stats` - Get employee statistics and analytics

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   │   └── employees/  # Employee API endpoints
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
├── lib/               # Utility libraries
│   └── prisma.ts      # Prisma client
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.