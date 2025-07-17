import './globals.css';

export const metadata = {
  title: 'Freshers Management Dashboard',
  description: 'A comprehensive dashboard for managing freshers and assessments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100 antialiased">{children}</body>
    </html>
  )
}
