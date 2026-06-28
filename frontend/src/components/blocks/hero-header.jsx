

import React from "react";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
];

export const HeroHeader = () => {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 py-3 transition",
          scrolled && "bg-background/70 backdrop-blur border rounded-xl mt-2"
        )}
      >
        {/* LOGO */}
        <Link to="/" className="font-bold">
          LOGO
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex gap-6 text-sm">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.href}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline">
            Login
          </Button>

          <Button size="sm">Sign Up</Button>

          {/* MOBILE */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-background border p-4">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.href} className="block py-2">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};