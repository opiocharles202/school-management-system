import React from 'react';
import { LANDING_CONTENT } from '@/constants/landing-content';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-zinc-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            Three steps to a digital school
          </h2>
          <p className="text-zinc-400 text-lg">
            We've streamlined the transition so you can focus on education, not software setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-zinc-800 -z-10" />
          
          {LANDING_CONTENT.process.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center text-3xl font-black text-white relative z-10">
                {step.step}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
