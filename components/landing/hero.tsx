import React from 'react';
import { LANDING_CONTENT } from '@/constants/landing-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <Badge variant="secondary" className="px-3 py-1 rounded-full text-primary border-primary/20">
              Now available for 2026 Admissions
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-zinc-900">
              {LANDING_CONTENT.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              {LANDING_CONTENT.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/get-started">
                <Button size="lg" className="text-lg px-8 h-12">
                  {LANDING_CONTENT.hero.primaryCTA}
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                {LANDING_CONTENT.hero.secondaryCTA}
              </Button>
            </div>
          </div>
          
          <div className="relative lg:block">
            {/* Mockup Container */}
            <div className="relative z-10 rounded-2xl border bg-white shadow-2xl overflow-hidden aspect-video transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="bg-zinc-100 h-full w-full flex items-center justify-center text-zinc-400 italic">
                 [Dashboard Preview Mockup]
               </div>
            </div>
            {/* Decorative Background Blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
