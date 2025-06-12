import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MAXIMUM POWER - Erkaklar kuchi uchun tabiiy mahsulot",
  description:
    "Erkaklar kuchi va quvvatini oshirish uchun 7 ta tabiiy komponentdan iborat mahsulot. 100% tabiiy tarkib, 15 kun ichida natija.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
