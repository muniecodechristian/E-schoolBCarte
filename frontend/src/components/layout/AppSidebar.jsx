import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Home,
  Users,
  Settings,
  Ticket,
} from "lucide-react";

const items = [
  {
    title: "Accueil",
    url: "#",
    icon: Home,
  },
  {
    title: "Utilisateurs",
    url: "#",
    icon: Users,
  },
  {
    title: "Billets",
    url: "#",
    icon: Ticket,
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
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

      <SidebarFooter>
        <div className="p-4 text-sm text-muted-foreground">
          Connecté en tant qu'Admin
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}