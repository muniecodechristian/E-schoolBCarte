import {
  Bell,
  Search,
  Moon,
  Sun,
  Settings,
  ChevronDown,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header({
  title,
  subtitle,
}) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">

      <div className="flex h-20 items-center justify-between px-6">

        {/* Gauche */}

        <div className="flex items-center gap-4">

          <SidebarTrigger className="rounded-xl" />

          <div>

            <h1 className="text-2xl font-bold tracking-tight">
              {title}
            </h1>

            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>

          </div>

        </div>

        {/* Centre */}

        <div className="hidden xl:flex w-[430px]">

          <div className="relative w-full">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />

            <Input
              placeholder="Rechercher un élève, un agent..."
              className="pl-10 rounded-2xl h-11"
            />

          </div>

        </div>

        {/* Droite */}

        <div className="flex items-center gap-3">

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
          >
            <Moon size={18} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl relative"
          >

            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
          >
            <Settings size={18} />
          </Button>

          <div className="h-8 w-px bg-border" />

          <button className="flex items-center gap-3 rounded-2xl border bg-card px-3 py-2 transition hover:bg-accent">

            <Avatar>

              <AvatarFallback className="bg-violet-600 text-white">

                CM

              </AvatarFallback>

            </Avatar>

            <div className="hidden lg:block text-left">

              <p className="text-sm font-semibold">
                Christian
              </p>

              <p className="text-xs text-muted-foreground">
                Administrateur
              </p>

            </div>

            <ChevronDown size={16} />

          </button>

        </div>

      </div>

    </header>
  );
}