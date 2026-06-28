"use client";

import React from "react";
import {
  ArrowRight,
  Check,
  Star,
  Users,
  Shield,
  BarChart3,
  Smartphone,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomeSection() {
  return (
    <main className="bg-white text-gray-900 overflow-hidden">


      

      {/* FEATURES */}
      <section className="px-10 py-20 bg-gray-50">
        <h3 className="text-center text-3xl font-bold">
          Why Choose Our Platform
        </h3>

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {[
            { icon: Zap, title: "Fast Performance" },
            { icon: Shield, title: "Secure Data" },
            { icon: Users, title: "Team Collaboration" },
            { icon: BarChart3, title: "Analytics" },
          ].map((item, i) => (
            <Card key={i} className="p-6 text-center">
              <item.icon className="mx-auto text-purple-600" />
              <p className="mt-3 font-semibold">{item.title}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="px-10 py-20 grid md:grid-cols-3 gap-10 text-center">
        <div>
          <h4 className="text-4xl font-bold text-purple-600">29M+</h4>
          <p className="text-gray-500">Tasks completed</p>
        </div>
        <div>
          <h4 className="text-4xl font-bold text-purple-600">1000+</h4>
          <p className="text-gray-500">Active users</p>
        </div>
        <div>
          <h4 className="text-4xl font-bold text-purple-600">99%</h4>
          <p className="text-gray-500">Satisfaction</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 py-20">
        <div className="bg-purple-600 text-white rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-bold">
            Ready to boost your productivity?
          </h3>

          <p className="mt-4 text-white/80">
            Start using Mutmiz today and transform your workflow.
          </p>

          <Button className="mt-6 bg-white text-purple-600 rounded-full px-6">
            Get Started
          </Button>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="px-10 py-20">
        <h3 className="text-center text-3xl font-bold">
          What Users Say
        </h3>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            "Amazing platform, improved my workflow.",
            "Clean UI and very fast performance.",
            "Best productivity tool I've used.",
          ].map((t, i) => (
            <Card key={i} className="p-6">
              <p className="text-gray-600">"{t}"</p>
              <p className="mt-4 font-semibold">User {i + 1}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-10 py-10 border-t text-center text-gray-500 text-sm">
        © 2026 Mutmiz. All rights reserved.
      </footer>

    </main>
  );
}