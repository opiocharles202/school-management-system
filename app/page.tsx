import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import PainPoints from '@/components/landing/pain-points';
import Features from '@/components/landing/features';
import HowItWorks from '@/components/landing/how-it-works';
import FAQ from '@/components/landing/faq';
import Pricing from '@/components/landing/pricing';
import Footer from '@/components/landing/footer';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero />
      <PainPoints />
      <Features />
      <HowItWorks />
      <FAQ />
      <Pricing />
      
      {/* Final CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
            Ready to digitize your school?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of administrators who have reclaimed their time and improved their school's efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-100 transition-colors shadow-xl">
                Get Started Now
              </button>
            </Link>
            <button className="bg-primary-foreground/10 border border-primary-foreground/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-foreground/20 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
