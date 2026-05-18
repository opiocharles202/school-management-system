import Link from 'next/link';
import React from 'react';
import { LANDING_CONTENT } from '@/constants/landing-content';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black">S</div>
            SchooLyze
          </Link>
          
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-6">
                {LANDING_CONTENT.navbar.links.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <Link href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:flex px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Log in
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {LANDING_CONTENT.navbar.cta}
          </Button>
        </div>
      </div>
    </nav>
  );
}
