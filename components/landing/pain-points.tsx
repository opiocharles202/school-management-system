import React from 'react';
import { LANDING_CONTENT } from '@/constants/landing-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function PainPoints() {
  return (
    <section id="problems" className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Stop fighting your tools. <br />Start leading your school.
          </h2>
          <p className="text-lg text-muted-foreground">
            Most administration software was built for accountants, not educators. We're changing that.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LANDING_CONTENT.painPoints.map((point, idx) => (
            <Card key={idx} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-zinc-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {point.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {point.solution}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
