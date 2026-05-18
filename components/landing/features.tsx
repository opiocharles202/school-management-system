"use client";
import React, { useState } from 'react';
import { LANDING_CONTENT } from '@/constants/landing-content';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, GraduationCap, ShieldCheck } from 'lucide-react';

export default function Features() {
  const [activePersona, setActivePersona] = useState<'admin' | 'teacher' | 'student'>('admin');
  
  const personaMap = {
    admin: { label: 'Administrators', icon: Users, color: 'bg-blue-500' },
    teacher: { label: 'Teachers', icon: GraduationCap, color: 'bg-emerald-500' },
    student: { label: 'Students & Parents', icon: ShieldCheck, color: 'bg-purple-500' },
  };

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Tailored tools for every role
          </h2>
          <p className="text-lg text-muted-foreground">
            A unified experience that gives everyone exactly what they need, and nothing they don't.
          </p>
        </div>

        <div className="flex justify-center mb-12 p-1 bg-zinc-100 rounded-xl w-fit mx-auto">
          {(Object.keys(LANDING_CONTENT.features) as Array<keyof typeof LANDING_CONTENT.features>).map((key) => {
            const Icon = personaMap[key].icon;
            return (
              <Button 
                key={key}
                variant={activePersona === key ? 'default' : 'ghost'}
                onClick={() => setActivePersona(key)}
                className="gap-2 px-6"
              >
                <Icon className="w-4 h-4" />
                {personaMap[key].label}
              </Button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LANDING_CONTENT.features[activePersona].map((feature, idx) => (
            <Card key={idx} className="border-zinc-200 shadow-sm hover:border-primary transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className={`w-10 h-10 rounded-lg ${personaMap[activePersona].color} flex items-center justify-center text-white mb-4`}>
                   <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
