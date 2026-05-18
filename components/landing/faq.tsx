import React from 'react';
import { LANDING_CONTENT } from '@/constants/landing-content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Got questions? We have answers.
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about getting started with SchooLyze.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion className="w-full space-y-4">
            {LANDING_CONTENT.faq.map((item, idx) => (
              <AccordionItem key={idx} className="px-4 rounded-lg border border-zinc-200 bg-zinc-50/50">
                <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
