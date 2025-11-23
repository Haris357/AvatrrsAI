"use client";

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DigitalTwinConfig } from '@/components/digital-twin/DigitalTwinConfig';

export default function DigitalTwinPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="md:ml-72">
        <DigitalTwinConfig />
      </main>
    </div>
  );
}