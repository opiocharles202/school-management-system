export const LANDING_CONTENT = {
  navbar: {
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: 'Get Started',
  },
  hero: {
    title: 'The Operating System for Modern Education',
    subtitle: 'Eliminate paperwork, automate grading, and connect your entire school community with one unified platform.',
    primaryCTA: 'Book a Demo',
    secondaryCTA: 'See Features',
  },
  painPoints: [
    {
      title: 'Manual Paperwork',
      description: 'Still using physical registers and paper files? Spend less time on bureaucracy and more time teaching.',
      solution: '100% Digital Records',
    },
    {
      title: 'Fragmented Tools',
      description: 'Using three different apps for fees, grades, and attendance? Bring everything into one source of truth.',
      solution: 'Unified Dashboard',
    },
    {
      title: 'Communication Gaps',
      description: 'Emails and WhatsApp groups are messy. Reach parents and students instantly through a professional portal.',
      solution: 'Instant Notifications',
    },
  ],
  features: {
    admin: [
      { title: 'Fee Management', desc: 'Automate invoicing and track payments in real-time.' },
      { title: 'Staff Payroll', desc: 'Manage salaries, leaves, and performance reviews.' },
      { title: 'Enrollment Portal', desc: 'Digitize the application process from start to finish.' },
    ],
    teacher: [
      { title: 'Digital Gradebooks', desc: 'Calculate averages and generate reports automatically.' },
      { title: 'Lesson Planning', desc: 'Share resources and track curriculum progress.' },
      { title: 'Smart Attendance', desc: 'One-click attendance with instant parent alerts.' },
    ],
    student: [
      { title: 'Result Portal', desc: 'Students can track their progress and download transcripts.' },
      { title: 'Timetable View', desc: 'Dynamic schedules with real-time classroom updates.' },
      { title: 'Assignment Hub', desc: 'Submit homework and receive feedback digitally.' },
    ],
  },
  process: [
    {
      step: '01',
      title: 'Import Your Data',
      description: 'Upload student and teacher lists via CSV or integrate with your existing system in minutes.',
    },
    {
      step: '02',
      title: 'Configure Your School',
      description: 'Set up your grading scales, class structures, and academic calendar.',
    },
    {
      step: '03',
      title: 'Go Live',
      description: 'Invite your staff and parents to the portal and start managing your school with zero stress.',
    },
  ],
  faq: [
    {
      question: 'Is my school\'s data secure?',
      answer: 'Yes. We use enterprise-grade encryption and regular backups. Your data is hosted on secure cloud servers with strict access controls.',
    },
    {
      question: 'How long does the onboarding take?',
      answer: 'Most schools are fully onboarded within 7 to 14 days, depending on the volume of historical data being imported.',
    },
    {
      question: 'Does it work with offline mode?',
      answer: 'While the system is cloud-based, we provide cached views for essential data to ensure continuity during brief internet outages.',
    },
    {
      question: 'Can we customize the grading system?',
      answer: 'Absolutely. Our system supports multiple grading standards (GPA, Percentages, Letter Grades) and custom weighted categories.',
    },
  ],
  pricing: [
    {
      name: 'Starter',
      price: '$49',
      desc: 'Perfect for small academies.',
      features: ['Up to 200 Students', 'Core Admin Tools', 'Digital Attendance', 'Email Support'],
    },
    {
      name: 'Professional',
      price: '$149',
      desc: 'The standard for growing schools.',
      features: ['Up to 1000 Students', 'Advanced Gradebooks', 'Parent Portal', 'Priority Support', 'Custom Reports'],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'For large institutions.',
      features: ['Unlimited Students', 'Dedicated Account Manager', 'White-labeling', 'On-premise Option', '24/7 Support'],
    },
  ],
};
