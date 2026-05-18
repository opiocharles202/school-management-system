"use client";
import React from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  HeartPulse, 
  Users, 
  FileText,
  ChevronLeft,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function StudentProfile() {
  // In a real app, we'd fetch this from an API using the ID
  const student = {
    id: 'S-1001',
    name: 'John Musoke',
    email: 'john@school.edu',
    phone: '+256 700 000 000',
    address: 'Kampala, Central District, Uganda',
    class: 'S4 North',
    track: 'Science',
    gender: 'Male',
    status: 'Active',
    dateOfBirth: '12 May 2008',
    bloodGroup: 'O+',
    allergies: 'None',
    guardianName: 'Peter Musoke',
    guardianPhone: '+256 770 000 000',
    guardianEmail: 'peter@example.com',
    guardianRelation: 'Father',
    academicHistory: [
      { term: 'Term 1 2025', grade: 'A', rank: '3rd', remarks: 'Excellent progress in Mathematics' },
      { term: 'Term 2 2025', grade: 'B+', rank: '5th', remarks: 'Consistent performance' },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/students" className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-500">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">{student.name}</h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="font-mono">{student.id}</span>
              <span className="opacity-50">•</span>
              <Badge variant="outline">{student.class}</Badge>
              <span className="opacity-50">•</span>
              <Badge className="bg-primary text-primary-foreground">{student.track}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" /> Print Dossier
          </Button>
          <Button className="gap-2">
            <User className="w-4 h-4" /> Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Basic Info Card */}
        <div className="space-y-6">
          <Card className="border-zinc-200 shadow-sm overflow-hidden">
            <div className="h-24 bg-zinc-100 border-b border-zinc-200" />
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-zinc-200 border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-zinc-500 -mt-12 mb-4">
                {student.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-zinc-900">{student.name}</h2>
              <p className="text-sm text-zinc-500 mb-6">{student.email}</p>
              
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 transition-colors">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-600">{student.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 transition-colors">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-600">{student.email}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 transition-colors">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-600 truncate">{student.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 shadow-sm">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-red-500" /> Medical Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">Blood Group</span>
                <span className="text-sm font-semibold">{student.bloodGroup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">Allergies</span>
                <span className="text-sm font-semibold">{student.allergies}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">DOB</span>
                <span className="text-sm font-semibold">{student.dateOfBirth}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Detailed Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="parents" className="w-full">
            <TabsList className="bg-zinc-100 p-1">
              <TabsTrigger value="parents">Parental Info</TabsTrigger>
              <TabsTrigger value="academics">Academic History</TabsTrigger>
              <TabsTrigger value="discipline">Discipline & Behavior</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parents" className="mt-6">
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-zinc-900">Guardian Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-zinc-400 uppercase">Full Name</p>
                      <p className="text-sm font-semibold">{student.guardianName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-zinc-400 uppercase">Relationship</p>
                      <p className="text-sm font-semibold">{student.guardianRelation}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-zinc-400 uppercase">Phone Number</p>
                      <p className="text-sm font-semibold">{student.guardianPhone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-zinc-400 uppercase">Email</p>
                      <p className="text-sm font-semibold">{student.guardianEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academics" className="mt-6">
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-zinc-900">Academic Progress</h3>
                  </div>
                  <div className="space-y-4">
                    {student.academicHistory.map((record, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-zinc-400" />
                          <span className="text-sm font-medium text-zinc-700">{record.term}</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-sm font-bold text-primary">{record.grade}</span>
                          <span className="text-xs text-zinc-500">Rank: {record.rank}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discipline" className="mt-6">
              <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-zinc-900">Disciplinary Records</h3>
                  </div>
                  <div className="text-center py-12 text-zinc-500">
                    <p className="text-sm italic">No disciplinary records found for this student.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
