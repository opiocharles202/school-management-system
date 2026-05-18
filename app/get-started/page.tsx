"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, ArrowLeft, School, User, FileText, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';

// Validation Schema
const ApplicationSchema = z.object({
  // Step 1: Admin Identity
  adminName: z.string().min(2, "Full name is required"),
  adminEmail: z.string().email("Invalid email address"),
  adminPhone: z.string().min(8, "Please enter a valid phone number"),
  adminRole: z.string().min(2, "Role is required"),
  // Step 2: School Details
  schoolName: z.string().min(2, "Official school name is required"),
  schoolAddress: z.string().min(5, "A valid physical address is required"),
  schoolType: z.string().min(2, "School type is required"),
  accreditationNo: z.string().min(1, "Accreditation number is required"),
  // Step 3: Capacity
  studentCount: z.coerce.number().int().positive("Must be a positive number"),
  teacherCount: z.coerce.number().int().positive("Must be a positive number"),
  specialRequirements: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof ApplicationSchema>;

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>> onClick={undefined}>({});
  
  const [formData, setFormData] = useState({
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminRole: '',
    schoolName: '',
    schoolAddress: '',
    schoolType: '',
    accreditationNo: '',
    studentCount: '',
    teacherCount: '',
    specialRequirements: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof ApplicationFormData]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = () => {
    const result = ApplicationSchema.safeParse(formData);
    if (result.success) return true;

    const stepErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
    const zodErrors = result.error.flatten().fieldErrors;

    if (step === 1) {
      const fields: (keyof ApplicationFormData)[] = ['adminName', 'adminEmail', 'adminPhone', 'adminRole'];
      fields.forEach(f => { if (zodErrors[f]) stepErrors[f] = zodErrors[f][0]; });
    } else if (step === 2) {
      const fields: (keyof ApplicationFormData)[] = ['schoolName', 'schoolAddress', 'schoolType', 'accreditationNo'];
      fields.forEach(f => { if (zodErrors[f]) stepErrors[f] = zodErrors[f][0]; });
    } else if (step === 3) {
      const fields: (keyof ApplicationFormData)[] = ['studentCount', 'teacherCount'];
      fields.forEach(f => { if (zodErrors[f]) stepErrors[f] = zodErrors[f][0]; });
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center space-y-6 p-8 border-zinc-200 shadow-xl">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900">Application Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you for applying. Here is what happens next:
            </p>
            <div className="text-left space-y-3">
              <div className="flex gap-3 text-sm">
                <div className="font-bold text-primary">1. Review</div>
                <div className="text-zinc-600">Our team will verify your school's details and capacity within 48 hours.</div>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="font-bold text-primary">2. Payment</div>
                <div className="text-zinc-600">If approved, you'll receive a customized quote and secure payment link via email.</div>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="font-bold text-primary">3. Activation</div>
                <div className="text-zinc-600">After payment, we'll schedule your onboarding and activate your digital portal.</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              We will contact you at <span className="font-semibold">{formData.adminEmail}</span> shortly.
            </p>
          </div>
          <Button asChild className="w-full py-6 text-lg">
            <Link href="/">Return to Home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">
            Join the Digital Revolution
          </h1>
          <p className="text-lg text-muted-foreground">
            Apply to bring your school onto the SchooLyze platform.
          </p>
        </div>

        <div className="mb-12 space-y-4">
          <div className="flex justify-between text-sm font-medium text-zinc-500 mb-2">
            <span>Step {step} of 3: {step === 1 ? 'Admin Identity' : step === 2 ? 'School Details' : 'Capacity'}</span>
            <span>{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl border-zinc-200 bg-white">
          <CardHeader className="border-b bg-zinc-50/50">
            <CardTitle className="flex items-center gap-3 text-zinc-800">
              {step === 1 && <User className="w-5 h-5 text-primary" />}
              {step === 2 && <School className="w-5 h-5 text-primary" />}
              {step === 3 && <FileText className="w-5 h-5 text-primary" />}
              {step === 1 ? 'Admin Identity' : step === 2 ? 'School Details' : 'Capacity & Requirements'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 sm:p-10 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="adminName">Full Name</Label>
                    <Input 
                      id="adminName" 
                      placeholder="John Doe" 
                      value={formData.adminName}
                      onChange={(e) => updateField('adminName', e.target.value)}
                    />
                    {errors.adminName && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.adminName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Work Email</Label>
                    <Input 
                      id="adminEmail" 
                      type="email" 
                      placeholder="admin@school.edu" 
                      value={formData.adminEmail}
                      onChange={(e) => updateField('adminEmail', e.target.value)}
                    />
                    {errors.adminEmail && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.adminEmail}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPhone">Phone Number</Label>
                    <Input 
                      id="adminPhone" 
                      placeholder="+256 ..." 
                      value={formData.adminPhone}
                      onChange={(e) => updateField('adminPhone', e.target.value)}
                    />
                    {errors.adminPhone && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.adminPhone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminRole">Your Role</Label>
                    <Input 
                      id="adminRole" 
                      placeholder="e.g. Principal, Director, Owner" 
                      value={formData.adminRole}
                      onChange={(e) => updateField('adminRole', e.target.value)}
                    />
                    {errors.adminRole && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.adminRole}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="schoolName">Official School Name</Label>
                    <Input 
                      id="schoolName" 
                      placeholder="Makerere Primary School" 
                      value={formData.schoolName}
                      onChange={(e) => updateField('schoolName', e.target.value)}
                    />
                    {errors.schoolName && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.schoolName}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="schoolAddress">Physical Address</Label>
                    <Input 
                      id="schoolAddress" 
                      placeholder="Street, City, Region" 
                      value={formData.schoolAddress}
                      onChange={(e) => updateField('schoolAddress', e.target.value)}
                    />
                    {errors.schoolAddress && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.schoolAddress}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolType">School Type</Label>
                    <Input 
                      id="schoolType" 
                      placeholder="e.g. Private, Public, International" 
                      value={formData.schoolType}
                      onChange={(e) => updateField('schoolType', e.target.value)}
                    />
                    {errors.schoolType && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.schoolType}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accreditationNo">Accreditation No.</Label>
                    <Input 
                      id="accreditationNo" 
                      placeholder="REG-123456" 
                      value={formData.accreditationNo}
                      onChange={(e) => updateField('accreditationNo', e.target.value)}
                    />
                    {errors.accreditationNo && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.accreditationNo}</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="studentCount">Total Students</Label>
                    <Input 
                      id="studentCount" 
                      type="number" 
                      placeholder="500" 
                      value={formData.studentCount}
                      onChange={(e) => updateField('studentCount', e.target.value)}
                    />
                    {errors.studentCount && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.studentCount}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacherCount">Total Staff/Teachers</Label>
                    <Input 
                      id="teacherCount" 
                      type="number" 
                      placeholder="40" 
                      value={formData.teacherCount}
                      onChange={(e) => updateField('teacherCount', e.target.value)}
                    />
                    {errors.teacherCount && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.teacherCount}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="specialRequirements">Additional Notes / Special Requirements</Label>
                    <textarea 
                      id="specialRequirements" 
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your specific needs..." 
                      value={formData.specialRequirements}
                      onChange={(e) => updateField('specialRequirements', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-8 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep} 
                  disabled={step === 1 || isLoading}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </Button>
                
                <Button 
                  type={step === 3 ? 'submit' : 'button'} 
                  onClick={step !== 3 ? nextStep : undefined}
                  className="gap-2 px-8"
                  disabled={isLoading}
                >
                  {step === 3 ? 'Submit Application' : 'Next Step'}
                  {step !== 3 && <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
