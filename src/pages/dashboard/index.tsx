'use client';

import ProtectedLayout from '../../components/ProtectedLayout';

export default function DashboardHome() {
  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <p>Your clinic dashboard is under construction. You’ll soon be able to manage content blocks, templates, and settings here.</p>
      </div>
    </ProtectedLayout>
  );
}
