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

// Validation Schema for Staff
const StaffSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  staffId: z.string().min(3, "Staff ID is required"),
  role: z.string().min(2, "Role is required"),
  department: z.string().min(2, "Department is required"),
  status: z.enum(['Active', 'Inactive']),
});

type StaffFormValues = z.infer<typeof StaffSchema>;

const MOCK_STAFF_INITIAL = [
  { id: 'ST-001', name: 'Dr. Sarah Smith', role: 'Principal', department: 'Administration', status: 'Active', email: 'sarah.smith@school.edu' },
  { id: 'ST-002', name: 'Mr. James Wilson', role: 'Vice Principal', department: 'Administration', status: 'Active', email: 'james.wilson@school.edu' },
  { id: 'ST-003', name: 'Ms. Emily Brown', role: 'Head of Mathematics', department: 'Mathematics', status: 'Active', email: 'emily.brown@school.edu' },
  { id: 'ST-004', name: 'Mr. Michael Johnson', role: 'Science Teacher', department: 'Science', status: 'Active', email: 'michael.johnson@school.edu' },
  { id: 'ST-005', name: 'Ms. Jessica Taylor', role: 'English Teacher', department: 'English', status: 'Active', email: 'jessica.taylor@school.edu' },
  { id: 'ST-006', name: 'Mr. Robert Miller', role: 'History Teacher', department: 'History', status: 'Inactive', email: 'robert.miller@school.edu' },
];

export default function StaffPage() {
  const [staff, setStaff] = useState(MOCK_STAFF_INITIAL);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof StaffFormValues, string>>>({});
  
  const [formData, setFormData] = useState<StaffFormValues>({
    name: '',
    email: '',
    staffId: '',
    role: '',
    department: '',
    status: 'Active',
  });

  const updateField = (field: keyof StaffFormValues, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = StaffSchema.safeParse(formData);
    
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

    await new Promise(r => setTimeout(r, 800));
    
    const newStaff = {
      ...formData,
      id: formData.staffId
    };
    
    setStaff([newStaff, ...staff]);
    setIsAdding(false);
    setFormData({
      name: '', email: '', staffId: '', role: '', department: '', status: 'Active',
    });
    setFormErrors({});
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Teachers & Staff Registry</h1>
          <p className="text-zinc-500">Manage faculty records, departmental roles, and staffing status.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button className="gap-2" onClick={() => setIsAdding(true)}>
            <UserPlus className="w-4 h-4" /> Add Staff Member
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
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Staff</p>
              <h3 className="text-2xl font-bold text-zinc-900">{staff.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Active Personnel</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {staff.filter(s => s.status === 'Active').length}
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
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Inactive/On Leave</p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {staff.filter(s => s.status !== 'Active').length}
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
                placeholder="Search by name, role or ID..." 
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
              <TableHead className="font-bold text-zinc-600">Staff ID</TableHead>
              <TableHead className="font-bold text-zinc-600">Full Name</TableHead>
              <TableHead className="font-bold text-zinc-600">Role</TableHead>
              <TableHead className="font-bold text-zinc-600">Department</TableHead>
              <TableHead className="font-bold text-zinc-600">Status</TableHead>
              <TableHead className="text-right font-bold text-zinc-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((member) => (
                <TableRow key={member.id} className="hover:bg-zinc-50 transition-colors group">
                  <TableCell className="font-mono text-xs font-medium text-zinc-500">{member.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-600">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-900">{member.name}</span>
                        <span className="text-[10px] text-zinc-400">{member.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-600">{member.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-zinc-600 border-zinc-200 font-medium">
                      {member.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[10px] font-bold uppercase",
                      member.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                    )}>
                      {member.status}
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
                        <DropdownMenuItem className="cursor-pointer">View Profile</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Edit Details</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Modify Contract</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">Deactivate Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-zinc-500 text-sm">
                  No staff members found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Staff Member</DialogTitle>
            <DialogDescription>
              Enter the personnel's basic information to add them to the faculty registry.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddStaff} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Dr. Sarah Smith" 
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)} 
                />
                {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="staffId">Staff ID</Label>
                  <Input 
                    id="staffId" 
                    placeholder="ST-2026001" 
                    value={formData.staffId}
                    onChange={(e) => updateField('staffId', e.target.value)} 
                  />
                  {formErrors.staffId && <p className="text-xs text-destructive">{formErrors.staffId}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Employment Status</Label>
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
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="staff@school.edu" 
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)} 
                />
                {formErrors.email && <p className="text-xs text-destructive">{formErrors.email}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Job Role</Label>
                  <Input 
                    id="role" 
                    placeholder="e.g. Senior Teacher" 
                    value={formData.role}
                    onChange={(e) => updateField('role', e.target.value)} 
                  />
                  {formErrors.role && <p className="text-xs text-destructive">{formErrors.role}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input 
                    id="department" 
                    placeholder="e.g. Mathematics" 
                    value={formData.department}
                    onChange={(e) => updateField('department', e.target.value)} 
                  />
                  {formErrors.department && <p className="text-xs text-destructive">{formErrors.department}</p>}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" /> Save Staff Member
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
