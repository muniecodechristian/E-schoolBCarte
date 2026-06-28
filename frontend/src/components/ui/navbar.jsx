"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  School,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

const links = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Élèves", icon: Users },
  { label: "Cartes", icon: FileText },
  { label: "Écoles", icon: School },
  { label: "Paramètres", icon: Settings },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Apply theme
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2 font-bold text-lg text-neutral-900 dark:text-white">
          <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900">
            <School size={18} />
          </div>
          E-SCHOOLB
        </div>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href="#"
                className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
              >
                <Icon size={16} />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-3">

          {/* THEME TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:scale-105 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="px-4 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition">
            Se connecter
          </button>

          <button className="px-4 py-2 text-sm rounded-xl bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition">
            Générer une carte
          </button>
        </div>

        {/* MOBILE BUTTONS */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-4 space-y-3">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href="#"
                className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 py-2"
              >
                <Icon size={18} />
                {link.label}
              </a>
            );
          })}

          <div className="pt-3 flex flex-col gap-2">
            <button className="w-full py-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
              Se connecter
            </button>
            <button className="w-full py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">
              Générer une carte
            </button>
          </div>
        </div>
      )}
    </header>
  );
}