import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Image Tracking AR",
  description: "Marker Based Augmented Reality Experience",
}

export default function RootLayout({
  children,
}:{
  children: React.ReactNode
}){
  return(
    <html
      lang="en"
      style={{
        margin:0,
        padding:0,
        width:"100%",
        height:"100%"
      }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          margin:0,
          padding:0,
          width:"100%",
          height:"100%",
          overflow:"hidden",
          background:"#000"
        }}
      >
        {children}
      </body>
    </html>
  )
}