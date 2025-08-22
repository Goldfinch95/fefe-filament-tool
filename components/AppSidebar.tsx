"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Link from "next/link";
import Image from "next/image";

import { useSidebar } from "@/components/ui/sidebar"

import { Boxes, List, Paintbrush, Scale, } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Colores",
    url: "/",
    icon: Paintbrush,
  },
  {
    title: "Balance",
    url: "/balance",
    icon: Scale,
  },
  {
    title: "Stock",
    url: "#",
    icon: Boxes,
  },
  {
    title: "Pedidos",
    url: "#",
    icon: List,
  },
]
 
export function AppSidebar() {
  const { isMobile } = useSidebar();

  if (isMobile) {
    // Navbar horizontal arriba en mobile
    return (
      <nav
        className="dark bg-sidebar text-sidebar-foreground w-full flex flex-row items-center px-2 py-2 shadow-md fixed top-0 left-0 right-0 z-50"
        style={{ width: "100vw", position: "fixed", top: 0, left: 0, right: 0 }}
      >
        <ul className="flex flex-row gap-2 w-full justify-center items-center">
          {items.map((item) => (
            <li key={item.title}>
              <Link href={item.url} className="flex flex-col items-center justify-center px-3 py-1">
                <item.icon />
                <span className="text-xs">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  // Sidebar vertical en desktop
  return (
    <Sidebar className="dark" collapsible="none" >
      <SidebarHeader>
        <Image
          src="/fefe.webp"
          alt="Logo"
          className="size-8 rounded-full mx-auto mb-2"
          width={32}
          height={32}
        />
      </SidebarHeader>
      <SidebarContent>
       <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}