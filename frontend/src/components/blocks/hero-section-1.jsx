"use client";

import React from "react";

import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { AnimatedGroup } from "../ui/AnimatedGroup";
import { HeroHeader } from "./hero-header";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <HeroHeader />

      <main className="overflow-hidden bg-background text-foreground">
        <section className="relative pt-24 md:pt-36">
          <div className="mx-auto max-w-7xl px-6 text-center">

            {/* TOP BADGE */}
            <AnimatedGroup variants={transitionVariants}>
              <Link
                to="#"
                className="mx-auto flex w-fit items-center gap-3 rounded-full border bg-muted px-4 py-1 text-sm shadow-sm"
              >
                Introducing AI Models
                <ArrowRight className="size-4" />
              </Link>

              {/* TITLE */}
              <h1 className="mt-8 text-4xl md:text-6xl font-semibold max-w-4xl mx-auto">
                Modern Solutions for Customer Engagement
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
                Highly customizable components for modern SaaS applications.
              </p>
            </AnimatedGroup>

            {/* BUTTONS */}
            <AnimatedGroup className="mt-10 flex flex-col md:flex-row justify-center gap-3">
              <Button size="lg">
                Start Building
              </Button>

              <Button size="lg" variant="ghost">
                Request Demo
              </Button>
            </AnimatedGroup>
          </div>
        </section>

        {/* LOGOS */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto opacity-70">
            {["github", "openai", "laravel", "nike"].map((logo) => (
              <img
                key={logo}
                src={`https://cdn.simpleicons.org/${logo}`}
                alt={logo}
                className="h-6 mx-auto dark:invert"
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}