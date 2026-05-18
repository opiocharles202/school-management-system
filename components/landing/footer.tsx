import React from 'react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="text-white text-xl font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-black">S</div>
              SchooLyze
            </div>
            <p className="text-sm leading-relaxed">
              Empowering educators with the tools they need to shape the future of learning.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Stay Updated</h4>
            <p className="text-sm">Join our newsletter for education tech tips.</p>
            <div className="flex gap-2">
              <input 
                className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-primary" 
                placeholder="Email address" 
              />
              <Button size="sm" className="bg-primary text-primary-foreground">Join</Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-800 text-center text-xs font-medium">
          © {new Date().getFullYear()} SchooLyze Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
