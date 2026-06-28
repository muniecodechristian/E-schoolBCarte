"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, School, ShieldCheck } from "lucide-react";

// ---------------- DATA E-SCHOOLB ----------------
const testimonials = [
  {
    text:
      "E-SchoolB a totalement transformé la gestion de nos cartes d’élèves. La génération est rapide, fiable et parfaitement adaptée à notre établissement.",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Direction du Collège Saint-Joseph",
    role: "Kinshasa, RDC",
  },
  {
    text:
      "Nous avons réduit considérablement le temps de traitement des cartes. Tout est désormais digitalisé et centralisé sur une seule plateforme.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Secrétariat Académique",
    role: "École secondaire",
  },
  {
    text:
      "L’interface est intuitive et accessible même pour les équipes non techniques. E-SchoolB simplifie réellement notre travail administratif.",
    image:
      "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Responsable IT",
    role: "Institut Technique",
  },
  {
    text:
      "La sécurité des données élèves est un vrai atout. Nous avons enfin une solution fiable et professionnelle pour notre école.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Proviseur",
    role: "Établissement public",
  },
  {
    text:
      "Grâce à E-SchoolB, les cartes sont générées plus rapidement et distribuées sans erreur. Cela améliore aussi la satisfaction des parents.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Service de gestion scolaire",
    role: "Administration éducative",
  },
  {
    text:
      "Une solution indispensable pour la modernisation des écoles en RDC. Simple, efficace et adaptée à nos réalités.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Directeur des études",
    role: "Réseau scolaire",
  },
  {
    text:
      "Le temps de création des cartes est passé de plusieurs jours à quelques minutes seulement. Un vrai gain de productivité.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Administration scolaire",
    role: "Kinshasa",
  },
  {
    text:
      "E-SchoolB apporte enfin une solution locale fiable pour la digitalisation de l’éducation.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Inspection scolaire",
    role: "Ministère de l’éducation",
  },
  {
    text:
      "Un outil moderne, stable et parfaitement adapté aux établissements scolaires africains.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Coordinateur pédagogique",
    role: "École privée",
  },
];

// ---------------- COLUMN ----------------
function TestimonialsColumn({ testimonials, duration = 10, className = "" }) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((index) => (
          <React.Fragment key={index}>
            {testimonials.map((item, i) => (
              <motion.li
                key={`${index}-${i}`}
                whileHover={{ scale: 1.03, y: -8 }}
                className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition max-w-xs"
              >
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                  “{item.text}”
                </p>

                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={item.image}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={item.name}
                  />
                  <div>
                    <p className="font-semibold text-sm text-neutral-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500">{item.role}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

// ---------------- SECTION ----------------
function TestimonialsSection() {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
  <section className="relative py-24 overflow-hidden">

      {/* HEADER */}
      <div className="text-center mb-16 max-w-2xl mx-auto">

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border text-xs text-neutral-600 dark:text-neutral-300">
          <School size={14} />
          Plateforme officielle E-SchoolB
        </div>

        <h2 className="text-4xl font-bold mt-4 text-neutral-900 dark:text-white">
          Adoptée par les établissements scolaires
        </h2>

        <p className="text-neutral-500 mt-3">
          Découvrez comment les écoles en République Démocratique du Congo modernisent la gestion des cartes d’élèves avec E-SchoolB.
        </p>

      </div>

      {/* COLUMNS */}
      <div className="flex justify-center gap-6 overflow-hidden">
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn testimonials={secondColumn} duration={19} className="hidden md:block" />
        <TestimonialsColumn testimonials={thirdColumn} duration={17} className="hidden lg:block" />
      </div>
    </section>
  );
}

// ---------------- APP ----------------
export default function TestimonialV2() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white">

      {/* THEME TOGGLE */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-5 right-5 p-3 rounded-full border bg-white dark:bg-neutral-900"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <TestimonialsSection />
    </div>
  );
}