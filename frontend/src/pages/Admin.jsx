import { GraduationCap, Users, CreditCard, Clock } from "lucide-react";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/layout/AppSidebar";
import Header from "@/COMPONENTS/layout/Header";
import StatsCard from "@/COMPONENTS/dashboard/StatsCard";


export default function Admin() {
  return (
    <SidebarProvider>


      <SidebarInset>


        <main className="flex-1 p-6 space-y-6">

          {/* Cartes statistiques */}

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
              title="Élèves"
              value="2 458"
              change="+15 aujourd'hui"
              color="blue"
              icon={<GraduationCap size={22} />}
            />

            <StatsCard
              title="Agents"
              value="164"
              change="+3 cette semaine"
              color="emerald"
              icon={<Users size={22} />}
            />

            <StatsCard
              title="Cartes générées"
              value="2 315"
              change="94 %"
              color="violet"
              icon={<CreditCard size={22} />}
            />

            <StatsCard
              title="Demandes"
              value="18"
              change="En attente"
              color="orange"
              icon={<Clock size={22} />}
            />

          </section>

          {/* Deuxième ligne */}

          <section className="grid gap-6 xl:grid-cols-3">

            <div className="xl:col-span-2 rounded-3xl border bg-background p-6 shadow-sm">

              <div className="mb-6">

                <h2 className="text-lg font-semibold">
                  Evolution des inscriptions
                </h2>

                <p className="text-sm text-muted-foreground">
                  Nombre d'élèves inscrits par mois.
                </p>

              </div>

              <div className="flex h-[340px] items-center justify-center rounded-2xl border border-dashed">

                Graphique Recharts

              </div>

            </div>

            <div className="rounded-3xl border bg-background p-6 shadow-sm">

              <h2 className="text-lg font-semibold">
                Répartition
              </h2>

              <p className="text-sm text-muted-foreground mb-6">
                Vue globale du système.
              </p>

              <div className="flex h-[340px] items-center justify-center rounded-2xl border border-dashed">

                Diagramme circulaire

              </div>

            </div>

          </section>

          {/* Dernières inscriptions */}

          <section className="rounded-3xl border bg-background p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold">
                  Dernières inscriptions
                </h2>

                <p className="text-sm text-muted-foreground">
                  Les élèves récemment enregistrés.
                </p>

              </div>

            </div>

            <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed">

              Tableau des élèves

            </div>

          </section>

          {/* Demandes + Activités */}

          <section className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-3xl border bg-background p-6 shadow-sm">

              <h2 className="text-lg font-semibold">
                Demandes en attente
              </h2>

              <p className="text-sm text-muted-foreground mb-6">
                Élèves et agents à approuver.
              </p>

              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed">

                Liste des demandes

              </div>

            </div>

            <div className="rounded-3xl border bg-background p-6 shadow-sm">

              <h2 className="text-lg font-semibold">
                Activités récentes
              </h2>

              <p className="text-sm text-muted-foreground mb-6">
                Historique des dernières actions.
              </p>

              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed">

                Timeline

              </div>

            </div>

          </section>

        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}