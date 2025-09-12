import "@/styles/globals.css";

import type { Metadata } from "next";

import {
  SidebarProvider,
} from "@/common/components/ui/sidebar";

import { AppSidebar } from "@/app/layout/AppSidebar";


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
      <body className={` antialiased min-h-screen flex`}>
        <SidebarProvider>
          <AppSidebar />
      <main className="background_img bg-[#10110e] min-h-s w-full">
        {children}
      </main>
    </SidebarProvider>
      </body>
    </html>
  );
}
