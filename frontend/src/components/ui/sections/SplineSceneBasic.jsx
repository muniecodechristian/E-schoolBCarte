"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/Spotlight";
import { SplineScene } from "@/components/ui/SplineScene";

export default function SplineSceneBasic() {
  return (
    <section className="w-full relative overflow-hidden">

      <Card className="relative w-full overflow-hidden rounded-none border-0 bg-gradient-to-b from-black via-zinc-950 to-black text-white">

        {/* LIGHT EFFECT */}
        <Spotlight className="-top-52 left-0 md:left-60" fill="white" />

        <div className="grid items-center lg:grid-cols-2">

          {/* ================= LEFT ================= */}
          <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-20">

            {/* BADGE */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex w-fit rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm backdrop-blur"
            >
              🇨🇩 Plateforme officielle de cartes d’élèves numériques
            </motion.span>

            {/* TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl text-5xl font-black leading-tight md:text-6xl"
            >
              Créez des{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                cartes d’élèves
              </span>{" "}
              modernes en quelques secondes
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 max-w-lg text-lg leading-8 text-zinc-300"
            >
              E-schoolb digitalise la gestion des cartes scolaires en République Démocratique du Congo.
              Génération rapide, sécurisée et professionnelle pour les établissements.
            </motion.p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-2xl bg-white text-black hover:bg-zinc-200">
                Générer une carte <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Voir une démo
              </Button>
            </div>

            {/* STATS */}
            <div className="mt-16 flex flex-wrap gap-12 text-left">
              <div>
                <h3 className="text-4xl font-bold">12K+</h3>
                <p className="text-sm text-zinc-400">Cartes générées</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">350+</h3>
                <p className="text-sm text-zinc-400">Écoles partenaires</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">5s</h3>
                <p className="text-sm text-zinc-400">Temps de génération</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative h-[520px] md:h-[650px] lg:h-[600px] flex items-center justify-center">

            {/* Spline robot */}
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full scale-110 lg:scale-125 xl:scale-150"
            />

            {/* ================= FLOATING CARD (NEW PREMIUM) ================= */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.08,
                rotate: -2,
                y: -10,
              }}
              className="absolute top-10 left-10 md:top-14 md:left-14"
            >
              {/* glow */}
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400/30 via-sky-400/20 to-violet-500/30 rounded-3xl scale-110" />

              {/* card image */}
              <img
                src="/card.png"
                alt="Carte d'élève NDAKO"
                className="relative w-[240px] md:w-[280px] lg:w-[320px] rounded-3xl shadow-2xl border border-white/10"
              />

              {/* badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 text-xs text-white">
                   Carte générée instantanément
                </div>
              </div>
            </motion.div>

            {/* RIGHT FADE */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </Card>
    </section>
  );
}