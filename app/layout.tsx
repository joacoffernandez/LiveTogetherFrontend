import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { UserProvider } from '../contexts/userContext'
import FamilyProvider from '../contexts/familyContext'
import { WebSocketProvider } from '../contexts/webSocketContext'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LiveTogether',
  description: 'Proyecto de 6AO',
  generator: 'h',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <UserProvider>
          <FamilyProvider>
            <WebSocketProvider>
              {children}
              <Analytics />
            </WebSocketProvider>
          </FamilyProvider>
        </UserProvider>
      </body>
    </html>
  )
}
