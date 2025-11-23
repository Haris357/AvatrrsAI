"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Chrome, Loader as Loader2, ArrowRight } from 'lucide-react';
import { signInWithGoogle } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export function SignInButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        router.push('/auth/username');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          onClick={handleSignIn}
          disabled={loading}
          size="lg"
          className="w-full group bg-black hover:bg-gray-800 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {loading ? (
            <>
              <Loader2 className="mr-3 w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <Chrome className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              Continue with Google
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </motion.div>
      
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Free forever • No credit card required
        </p>
      </div>
    </div>
  );
}