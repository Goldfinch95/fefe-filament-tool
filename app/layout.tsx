import "@/styles/globals.css";

import type { Metadata } from "next";

import {
  SidebarProvider,
} from "@/common/components/ui/sidebar";

import { AppSidebar } from "@/app/layout/AppSidebar";

import { Poppins, Varela_Round } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins", // la exponemos como variable CSS
});

const varela = Varela_Round({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-varela",
});



export const metadata: Metadata = {
  title: "Fefe3d printing",
  description: "Empresa creada por fede y fer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fefe.webp" type="image/webp" />
      </head>
      <body className={` antialiased ${poppins.variable} ${varela.variable}`}>
        <SidebarProvider className="h-screen">
          <AppSidebar />
      <main className="background_img bg-[#10110e] w-full">
        {children}
      </main>
    </SidebarProvider>
      </body>
    </html>
  );
}
