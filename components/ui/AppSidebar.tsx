"use client"

import * as React from "react"
import {
  AudioWaveform,
  
  Command,

  GalleryVerticalEnd,
  
} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faBoxesStacked, faClipboardList, faPalette } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"

const FaClipboardListIcon = () => <FontAwesomeIcon icon={faClipboardList} />; 
const FaBoxesStackedIcon = () => <FontAwesomeIcon icon={faBoxesStacked} />;
const FaBalanceScaleIcon = () => <FontAwesomeIcon icon={faBalanceScale} />; 
const FaPaletteIcon = () => <FontAwesomeIcon icon={faPalette} />;

// This is sample data.
const data = {
  user: {
    name: "fefe",
    email: "m@example.com",
    avatar: "/fefe.webp",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  navMain: [
    {
      title: "Colores",
      url: "/colores",
      icon: FaPaletteIcon,
    },
    {
      title: "Balance",
      url: "/phantom",
      icon: FaBalanceScaleIcon,
      items: [
        {
          title: "Gastos",
          url: "/phantom",
        },
        {
          title: "Ventas",
          url: "/phantom",
        },
      ],
    },
    {
      title: "Stock",
      url: "/stock",
      icon: FaBoxesStackedIcon,
    },
    {
      title: "Pedidos",
      url: "/orders",
      icon: FaClipboardListIcon,
    },
    
  ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image width={24} height={24} className="size-6 " src="/fefe.jfif" alt="Fefe3d Printing" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Fefe3d Printing</span>
                  {/*<span className="truncate text-xs">Enterprise</span>*/}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
       {/*<SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
