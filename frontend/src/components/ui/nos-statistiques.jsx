"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { School, Users, CheckCircle, Clock, Award } from "lucide-react";

const stats = [
  { label: "Cartes générées", value: 12000, icon: School, prefix: "+" },
  { label: "Écoles partenaires", value: 350, icon: Users, prefix: "+" },
  { label: "Taux de réussite", value: 98, icon: CheckCircle, suffix: "%" },
  { label: "Disponibilité", value: 24, icon: Clock, suffix: "/7" },
  { label: "Étudiants", value: 50000, icon: Users, prefix: "+" },
  { label: "Temps génération", value: 5, icon: Award, suffix: " sec" },
];

// 🔥 Counter hook ultra smooth
function useCounter(end, start) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startValue = 0;
    const duration = 1200;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      startValue += increment;

      if (startValue >= end) {
        startValue = end;
        clearInterval(timer);
      }

      setCount(Math.floor(startValue));
    }, 16);

    return () => clearInterval(timer);
  }, [end, start]);

  return count;
}

function StatCard({ stat, trigger }) {
  const count = useCounter(stat.value, trigger);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900">
          <Icon size={18} />
        </div>
        <p className="text-sm text-neutral-500">{stat.label}</p>
      </div>

      <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">
        {stat.prefix || ""}
        {count.toLocaleString()}
        {stat.suffix || ""}
      </h3>
    </motion.div>
  );
}

export default function NosStatistiques() {
  const ref = useRef(null);

  // 🔥 déclenchement scroll (UNE SEULE FOIS)
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-neutral-50 dark:bg-neutral-950">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white">
          Nos statistiques
        </h2>
        <p className="text-neutral-500 mt-3">
          Plateforme de génération de cartes d’élèves en RDC
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stats.map((s, i) => (
          <StatCard key={i} stat={s} trigger={isInView} />
        ))}
      </div>
    </section>
  );
}