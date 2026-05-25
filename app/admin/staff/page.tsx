import React from 'react';

const StaffPage = () => {
  const staffMembers = [
    { id: 1, name: 'Dr. Sarah Smith', role: 'Principal', email: 'sarah.smith@school.edu', department: 'Administration' },
    { id: 2, name: 'Mr. James Wilson', role: 'Vice Principal', email: 'james.wilson@school.edu', department: 'Administration' },
    { id: 3, name: 'Ms. Emily Brown', role: 'Head of Mathematics', email: 'emily.brown@school.edu', department: 'Mathematics' },
    { id: 4, name: 'Mr. Michael Johnson', role: 'Science Teacher', email: 'michael.johnson@school.edu', department: 'Science' },
    { id: 5, name: 'Ms. Jessica Taylor', role: 'English Teacher', email: 'jessica.taylor@school.edu', department: 'English' },
    { id: 6, name: 'Mr. Robert Miller', role: 'History Teacher', email: 'robert.miller@school.edu', department: 'History' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Teachers & Staff</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left border-b border-gray-200">
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Role</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Department</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Email</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-800">{staff.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{staff.role}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{staff.department}</td>
                <td className="px-6 py-4 text-sm text-blue-600 underline">{staff.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;
