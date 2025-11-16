import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import StyledComponentsRegistry from './lib/registry'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'BuildMart',
  description: 'Sua loja de materiais de construção',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      {/* ADICIONAMOS AS CLASSES DO TAILWIND AO BODY */}
      <body className="bg-white text-black">
        <StyledComponentsRegistry>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}