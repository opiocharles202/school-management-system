"use client";
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Download, 
  ArrowUpDown,
  UserPlus,
  X,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { z } from 'zod';

// Validation Schema for New Student
const StudentSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  studentId: z.string().min(3, "Student ID is required"),
  class: z.string().min(2, "Class is required"),
  track: z.string().min(2, "Academic track is required"),
  gender: z.enum(['Male', 'Female', 'Other']),
  status: z.enum(['Active', 'Inactive']),
});

type StudentFormValues = z.infer<typeof StudentSchema>;

const MOCK_STUDENTS_INITIAL = [
  { id: 'S-1001', name: 'John Musoke', class: 'S4 North', gender: 'Male', track: 'Science', status: 'Active', email: 'john@school.edu' },
  { id: 'S-1002', name: 'Sarah Namuli', class: 'S3 South', gender: 'Female', track: 'Arts', status: 'Active', email: 'sarah@school.edu' },
  { id: 'S-1003', name: 'Peter Okello', class: 'S1 East', gender: 'Male', track: 'Science', status: 'Inactive', email: 'peter@school.edu' },
  { id: 'S-1004', name: 'Jane Atwine', class: 'S2 West', gender: 'Female', track: 'Technical', status: 'Active', email: 'jane@school.edu' },
  { id: 'S-1005', name: 'Samuel Kato', class: 'S4 North', gender: 'Male', track: 'Science', status: 'Active', email: 'samuel@school.edu' },
  { id: 'S-1006', name: 'Mercy Akello', class: 'S5 Alpha', gender: 'Female', track: 'Arts', status: 'Active', email: 'mercy@school.edu' },
  { id: 'S-1007', name: 'David Luta', class: 'S6 Beta', gender: 'Male', track: 'Science', status: 'Active', email: 'david@school.edu' },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(MOCK_STUDENTS_INITIAL);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof StudentFormValues, string>>>({});
  
  const [formData, setFormData] = useState<StudentFormValues>({
    name: '',
    email: '',
    studentId: '',
    class: '',
    track: 'Science',
    gender: 'Male',
    status: 'Active',
  });

  const updateField = (field: keyof StudentFormValues, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = StudentSchema.safeParse(formData);
    
    if (!result.success) {
      const errors: any = {};
      const fieldErrors = result.error.flatten().fieldErrors;
      
      Object.entries(fieldErrors).forEach(([field, errs]) => {
        if (errs && errs.length > 0) {
          errors[field] = errs[0];
        }
      });
      
      setFormErrors(errors);
      return;
    }

    // Simulate API save
    await new Promise(r => setTimeout(r, 800));
    
    const newStudent = {
      ...formData,
      id: formData.studentId // Using studentId as the unique key for the mock state
    };
    
    setStudents([newStudent, ...students]);
    setIsAdding(false);
    setFormData({
      name: '', email: '', studentId: '', class: '', track: 'Science', gender: 'Male', status: 'Active',
    });
    setFormErrors({});
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Student Information System</h1>
          <p className="text-zinc-500">Manage your student records, enrollments, and academic tracks.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button className="gap-2" onClick={() => setIsAdding(true)}>
            <UserPlus className="w-4 h-4" /> Add New Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Students</p>
              <h3 className="text-2xl font-bold text-zinc-900">{students.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Active Enrollments</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {students.filter(s => s.status === 'Active').length}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Inactive/Pending</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {students.filter(s => s.status !== 'Active').length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-200 shadow-sm bg-white">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input 
                placeholder="Search by name or ID..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-zinc-400" />
              <select 
                className="text-sm border-zinc-200 rounded-md px-2 py-1 focus:ring-2 ring-primary/20 outline-none bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 text-zinc-500">
            <ArrowUpDown className="w-4 h-4" /> Sort By
          </Button>
        </CardContent>
      </Card>

      <Card className="border-zinc-200 shadow-sm bg-white">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow>
              <TableHead className="font-bold text-zinc-600">Student ID</TableHead>
              <TableHead className="font-bold text-zinc-600">Full Name</TableHead>
              <TableHead className="font-bold text-zinc-600">Class/Stream</TableHead>
              <TableHead className="font-bold text-zinc-600">Academic Track</TableHead>
              <TableHead className="font-bold text-zinc-600">Status</TableHead>
              <TableHead className="text-right font-bold text-zinc-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-zinc-50 transition-colors group">
                  <TableCell className="font-mono text-xs font-medium text-zinc-500">{student.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-600">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-900">{student.name}</span>
                        <span className="text-[10px] text-zinc-400">{student.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-600">{student.class}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-zinc-600 border-zinc-200 font-medium">
                      {student.track}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[10px] font-bold uppercase",
                      student.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                    )}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = `/admin/students/${student.id}`}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Edit Details</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Transfer Class</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">Archive Student</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-zinc-500 text-sm">
                  No students found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* ADD STUDENT MODAL */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enroll New Student</DialogTitle>
            <DialogDescription>
              Enter the student's basic information to add them to the school registry.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddStudent} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Moses Okello" 
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)} 
                />
                {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input 
                    id="studentId" 
                    placeholder="S-2026001" 
                    value={formData.studentId}
                    onChange={(e) => updateField('studentId', e.target.value)} 
                  />
                  {formErrors.studentId && <p className="text-xs text-destructive">{formErrors.studentId}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={formData.gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="student@example.com" 
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)} 
                />
                {formErrors.email && <p className="text-xs text-destructive">{formErrors.email}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class/Stream</Label>
                  <Input 
                    id="class" 
                    placeholder="e.g. S4 North" 
                    value={formData.class}
                    onChange={(e) => updateField('class', e.target.value)} 
                  />
                  {formErrors.class && <p className="text-xs text-destructive">{formErrors.class}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="track">Academic Track</Label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={formData.track}
                    onChange={(e) => updateField('track', e.target.value)}
                  >
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Enrollment Status</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" /> Enroll Student
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
