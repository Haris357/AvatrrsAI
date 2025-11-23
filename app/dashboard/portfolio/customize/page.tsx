"use client";

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { PortfolioCustomizer } from '@/components/portfolio/PortfolioCustomizer';

export default function PortfolioCustomizePage() {
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

  return <PortfolioCustomizer />;
}