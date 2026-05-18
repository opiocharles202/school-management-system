import React from 'react';
import { LANDING_CONTENT } from '@/constants/landing-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            No hidden fees. Scale your plan as your student body grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {LANDING_CONTENT.pricing.map((plan, idx) => (
            <Card 
              key={idx} 
              className={`relative p-2 ${idx === 1 ? 'border-primary shadow-xl scale-105 z-10 bg-white' : 'border-zinc-200 shadow-sm bg-white'}`}
              style={{ overflow: 'visible' }}
            >
              {idx === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-50 shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center space-y-2 pt-8">
                <CardTitle className="text-2xl font-bold text-zinc-900">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-zinc-900">{plan.price === 'Custom' ? 'Custom' : plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground text-sm">/month</span>}
                </div>
                <p className="text-muted-foreground text-sm">{plan.desc}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-zinc-600">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-6 text-lg ${idx === 1 ? 'bg-primary text-primary-foreground' : 'bg-zinc-900 text-white'}`} 
                  variant={idx === 1 ? 'default' : 'secondary'}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
