import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  TrendingUp, 
  GraduationCap, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">School Overview</h1>
          <p className="text-zinc-500">Welcome back, Admin. Here's what is happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/reports">
            <button className="bg-white border border-zinc-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" /> Generate Term Report
            </button>
          </Link>
          <Link href="/admin/students">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Users className="w-4 h-4" /> Add Student
            </button>
          </Link>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Students" 
          value="1,240" 
          change="+12 this month" 
          icon={Users} 
          color="bg-blue-500" 
        />
        <MetricCard 
          title="Teacher Attendance" 
          value="94%" 
          change="-2% from last week" 
          icon={TrendingUp} 
          color="bg-emerald-500" 
        />
        <MetricCard 
          title="Average Grade" 
          value="B+" 
          change="+0.4 points" 
          icon={GraduationCap} 
          color="bg-purple-500" 
        />
        <MetricCard 
          title="Pending Apps" 
          value="24" 
          change="Needs review" 
          icon={AlertCircle} 
          color="bg-amber-500" 
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity / Applications */}
        <Card className="lg:col-span-2 shadow-sm border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <CardTitle className="text-lg font-bold">Recent Applications</CardTitle>
            <Link href="/admin/students" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-100">
              {[
                { name: 'John Musoke', date: '2 hours ago', status: 'Pending', track: 'Science' },
                { name: 'Sarah Namuli', date: '5 hours ago', status: 'Approved', track: 'Arts' },
                { name: 'Peter Okello', date: 'Yesterday', status: 'Pending', track: 'Science' },
                { name: 'Jane Atwine', date: '2 days ago', status: 'Review Required', track: 'Technical' },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-600">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{app.name}</p>
                      <p className="text-xs text-zinc-500">{app.date} • {app.track}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                      app.status === 'Approved' ? "bg-emerald-100 text-emerald-700" : 
                      app.status === 'Pending' ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-700"
                    )}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Action List */}
        <Card className="shadow-sm border-zinc-200">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <QuickActionItem label="Send Bulk SMS" icon={FileText} />
            <QuickActionItem label="Generate Timetable" icon={GraduationCap} />
            <QuickActionItem label="Manage Staff Leave" icon={Users} />
            <QuickActionItem label="Review Curriculum" icon={BookOpen} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon, color }: any) {
  return (
    <Card className="shadow-sm border-zinc-200 overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg text-white", color)}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-zinc-500">{change}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-zinc-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionItem({ label, icon: Icon }: any) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-all text-left group">
      <div className="p-2 rounded-md bg-zinc-100 group-hover:bg-white transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      {label}
    </button>
  );
}
