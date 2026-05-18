"use client";
import React from 'react';
import { Search, Bell, Calendar, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminTopbar() {
  const today = new Date().toLocaleDateString('en-UG', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
            Management Console
          </h2>
          <p className="text-xs text-zinc-400 font-normal">
            {today}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input 
            placeholder="Search students, staff..." 
            className="pl-9 w-64 bg-zinc-50 border-zinc-200 focus:bg-white transition-colors"
          />
        </div>

        <div className="h-8 w-[1px] bg-zinc-200 mx-2" />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-zinc-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3 h-9">
              <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-zinc-900 leading-none">Admin User</p>
                <p className="text-[10px] text-zinc-500 leading-none mt-1">Super Admin</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">School Configuration</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
