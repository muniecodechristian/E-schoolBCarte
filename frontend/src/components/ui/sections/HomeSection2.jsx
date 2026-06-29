"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, ShieldCheck, Sparkles } from "lucide-react";

export default function HomeSection2() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-slate-50 to-white dark:from-neutral-950 dark:to-neutral-950 px-6 py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-200 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16 z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6 text-center md:text-left"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-medium text-slate-600 dark:text-slate-300">
            <ShieldCheck size={14} />
            Plateforme officielle de gestion des cartes d’élèves
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Digitalisez la gestion des{" "}
            <span className="text-indigo-600">cartes d’élèves</span>{" "}
            en toute simplicité
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
            NDAKO permet aux établissements scolaires de créer, gérer et sécuriser les cartes d’élèves en quelques secondes, sans intermédiaire.
          </p>

          {/* CTA */}
          

          {/* Trust block */}
          <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-300" />
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-8 h-8 rounded-full bg-slate-500" />
            </div>

            <p className="text-sm text-slate-500">
              Utilisé par des établissements scolaires en RDC
            </p>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="flex-1 relative"
        >

          {/* MAIN CARD */}
          <div className="relative mx-auto w-[320px] md:w-[380px]">
            <Card className="p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-neutral-800 bg-white dark:bg-neutral-900">

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <Sparkles className="text-indigo-600" size={18} />
                  </div>
                  <div>
                   
                      <div className="w-8 h-8 rounded-full bg-slate-500" />
                
                    <p className="text-xs text-slate-500">
                      Génération instantanée
                    </p>
                  </div>
                </div>

                {/* fake UI blocks */}
                <div className="space-y-3 pt-2">
                  <div className="h-14 rounded-xl bg-slate-100 dark:bg-neutral-800 animate-pulse" />
                  <div className="h-14 rounded-xl bg-slate-100 dark:bg-neutral-800 animate-pulse" />
                  <div className="h-14 rounded-xl bg-slate-100 dark:bg-neutral-800 animate-pulse" />
                </div>
              </div>
            </Card>

            {/* floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -left-10"
            >
              <Card className="p-4 rounded-2xl shadow-lg border bg-white dark:bg-neutral-900">
                <div className="flex items-center gap-3">
                  <Users className="text-indigo-600" />
                  <div>
                    <p className="font-semibold text-sm">
                      Collaboration écoles
                    </p>
                    <p className="text-xs text-slate-500">
                      Gestion multi-utilisateurs
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}