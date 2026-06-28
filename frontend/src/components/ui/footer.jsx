"use client";

import React from "react";
import { School, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-white border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="p-2 rounded-xl bg-white/10">
                <School size={18} />
              </div>
              e-SchoolB
            </div>

            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              Plateforme digitale moderne dédiée à la gestion des établissements scolaires.
              Nous simplifions la création de cartes d’élèves et la digitalisation des écoles en République Démocratique du Congo.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Plateforme</h3>

            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="hover:text-white transition cursor-pointer">Tableau de bord</li>
              <li className="hover:text-white transition cursor-pointer">Générer une carte</li>
              <li className="hover:text-white transition cursor-pointer">Gestion des élèves</li>
              <li className="hover:text-white transition cursor-pointer">Écoles partenaires</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>

            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="hover:text-white transition cursor-pointer">Centre d’aide</li>
              <li className="hover:text-white transition cursor-pointer">Documentation</li>
              <li className="hover:text-white transition cursor-pointer">Contact support</li>
              <li className="hover:text-white transition cursor-pointer">Sécurité & confidentialité</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>

            <div className="space-y-3 text-sm text-neutral-400">

              <div className="flex items-center gap-2">
                <Mail size={16} />
                support@eschoolb.com
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                +243 810 000 000
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Kinshasa, RDC
              </div>

              <div className="flex items-center gap-2">
                <Globe size={16} />
                www.eschoolb.com
              </div>

            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 border-t border-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">

          <p>
            © {new Date().getFullYear()} e-SchoolB. Tous droits réservés.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white transition cursor-pointer">
              Conditions
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Confidentialité
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Sécurité
            </span>
          </div>
        </div>
      </div>

      {/* GLOW EFFECT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/10 blur-3xl rounded-full" />
    </footer>
  );
}