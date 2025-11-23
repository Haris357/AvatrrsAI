"use client";

import { motion } from 'framer-motion';
import { UsernameForm } from '@/components/auth/UsernameForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader as Loader2 } from 'lucide-react';

export default function UsernamePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-black mb-2">
            Choose Your Username
          </h1>
          <p className="text-gray-600">
            This will be your unique URL: avatrr.com/yourname
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
        >
          <UsernameForm />
        </motion.div>
      </div>
    </div>
  );
}