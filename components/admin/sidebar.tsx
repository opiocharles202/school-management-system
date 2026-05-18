"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  UserCog, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NAV_ITEMS = [
    {
      group: "Overview",
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ]
    },
    {
      group: "School Management",
      items: [
        { label: 'Students (SIS)', href: '/admin/students', icon: Users },
        { label: 'Teachers & Staff', href: '/admin/staff', icon: UserCog },
        { label: 'Classes & Streams', href: '/admin/classes', icon: GraduationCap },
      ]
    },
    {
      group: "Academics",
      items: [
        { label: 'Curriculum', href: '/admin/curriculum', icon: BookOpen },
        { label: 'Report Cards', href: '/admin/reports', icon: FileText },
      ]
    },
    {
      group: "System",
      items: [
        { label: 'Settings', href: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside 
      className={cn(
        "relative h-screen bg-zinc-900 text-zinc-400 transition-all duration-300 flex flex-col border-r border-zinc-800",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Area */}
      <div className="p-6 flex items-center gap-3 overflow-hidden">
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black">
          S
        </div>
        {!isCollapsed && (
          <span className="font-bold text-white tracking-tight truncate text-lg">
            SchooLyze <span className="text-primary">Admin</span>
          </span>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 px-3 space-y-8 overflow-y-auto py-6 custom-scrollbar">
        {NAV_ITEMS.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
            {!isCollapsed && (
              <p className="px-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "hover:bg-zinc-800 hover:text-zinc-100"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 flex-shrink-0", 
                    isActive ? "text-primary-foreground" : "text-zinc-500 group-hover:text-zinc-100"
                  )} />
                  {!isCollapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Space */}
      <div className="p-4">
         {!isCollapsed && (
            <div className="px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <p className="text-[10px] text-zinc-500 font-medium">Version 0.1.0-beta</p>
            </div>
         )}
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4 text-white" /> : <ChevronLeft className="w-4 h-4 text-white" />}
      </button>
    </aside>
  );
}
