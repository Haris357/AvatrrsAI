"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleCheck as CheckCircle, Circle as XCircle, Loader as Loader2 } from 'lucide-react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

export function UsernameForm() {
  const [username, setUsername] = useState('');
  const [availability, setAvailability] = useState<'checking' | 'available' | 'taken' | null>(null);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const validateUsername = (value: string) => {
    return /^[a-z0-9]{3,20}$/.test(value);
  };

  const checkAvailability = async (value: string) => {
    if (!validateUsername(value)) {
      setAvailability(null);
      return;
    }

    setAvailability('checking');
    try {
      const docRef = doc(db, 'profiles', value);
      const docSnap = await getDoc(docRef);
      setAvailability(docSnap.exists() ? 'taken' : 'available');
    } catch (error) {
      console.error('Error checking username:', error);
      setAvailability(null);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (username) {
        checkAvailability(username);
      } else {
        setAvailability(null);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || availability !== 'available') return;

    setLoading(true);
    try {
      // Create profile document
      await setDoc(doc(db, 'profiles', username), {
        userId: user.uid,
        username,
        resumeData: null,
        atsScore: 0,
        portfolioConfig: null,
        profileViews: 0,
        visibility: 'public',
        createdAt: new Date(),
        lastUpdated: new Date()
      });

      // Update user document
      await updateDoc(doc(db, 'users', user.uid), {
        username,
        updatedAt: new Date()
      });

      router.push('/onboarding/resume-input');
    } catch (error) {
      console.error('Error saving username:', error);
      setLoading(false);
    }
  };

  const isValid = validateUsername(username);
  const canSubmit = isValid && availability === 'available';

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="space-y-3">
        <Label htmlFor="username" className="text-base font-medium">
          Choose your username
        </Label>
        <div className="relative">
          <div className="flex items-center">
            <span className="bg-gray-50 border border-r-0 border-gray-300 px-3 py-2 text-gray-500 text-sm rounded-l-md">
              avatrr.com/
            </span>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              placeholder="yourname"
              className="rounded-l-none border-l-0 focus:ring-offset-0"
              maxLength={20}
            />
          </div>
          
          {/* Status indicator */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {availability === 'checking' && (
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            )}
            {availability === 'available' && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
            {availability === 'taken' && (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">Username requirements:</p>
          <ul className="space-y-1 ml-4">
            <li className={`flex items-center gap-2 ${
              username.length >= 3 && username.length <= 20 
                ? 'text-green-600' 
                : 'text-gray-400'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                username.length >= 3 && username.length <= 20 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`} />
              3-20 characters
            </li>
            <li className={`flex items-center gap-2 ${
              /^[a-z0-9]*$/.test(username) && username
                ? 'text-green-600' 
                : 'text-gray-400'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                /^[a-z0-9]*$/.test(username) && username
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`} />
              Lowercase letters and numbers only
            </li>
          </ul>
        </div>

        {/* Availability status */}
        {availability === 'available' && (
          <p className="text-green-600 text-sm font-medium">
            ✓ Username is available
          </p>
        )}
        {availability === 'taken' && (
          <p className="text-red-600 text-sm font-medium">
            ✗ Username is already taken
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!canSubmit || loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Creating Profile...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </motion.form>
  );
}