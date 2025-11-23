"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { SignInButton } from '@/components/auth/SignInButton';
import { CanvasBackground } from '@/components/auth/CanvasBackground';
import Link from 'next/link';
import { ArrowLeft, Shield, Zap, Users, Star, CircleCheck as CheckCircle, Globe, Bot, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function SignInPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  const features = [
    {
      icon: FileText,
      title: "ATS-Optimized Resumes",
      description: "95% pass rate guaranteed"
    },
    {
      icon: Globe,
      title: "AI Portfolio Builder",
      description: "Stunning websites in minutes"
    },
    {
      icon: Bot,
      title: "Digital Twin AI",
      description: "24/7 personal assistant"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Canvas Background */}
      <CanvasBackground />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to home
              </Link>
            </motion.div>

            {/* Sign-in card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                  className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl font-bold text-black mb-3"
                >
                  Welcome to Avatrr
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-gray-600 text-lg"
                >
                  Transform your career with AI-powered tools
                </motion.p>
              </div>

              {/* Features Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-8"
              >
                <div className="grid gap-3">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <div className="font-medium text-black text-sm">{feature.title}</div>
                          <div className="text-gray-600 text-xs">{feature.description}</div>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Sign In Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <SignInButton />
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="mt-8 pt-6 border-t border-gray-200/50"
              >
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>50K+ Users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
              </motion.div>

              {/* Terms */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-center text-sm text-gray-500 mt-6"
              >
                By signing in, you agree to our{' '}
                <Link href="#" className="text-black hover:underline font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-black hover:underline font-medium">
                  Privacy Policy
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Feature Showcase (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg"
          >
            {/* Hero Content */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Platform
              </Badge>
              <h2 className="text-4xl font-bold text-black mb-4 leading-tight">
                Build Your
                <span className="block bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  Professional Empire
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Join thousands of professionals who've accelerated their careers with our AI-powered toolkit.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {[
                {
                  title: "95% ATS Pass Rate",
                  description: "Our AI ensures your resume gets past screening systems",
                  icon: FileText,
                  color: "bg-green-50 border-green-200"
                },
                {
                  title: "10x Faster Portfolio Creation",
                  description: "Build stunning portfolios with AI assistance in minutes",
                  icon: Zap,
                  color: "bg-blue-50 border-blue-200"
                },
                {
                  title: "24/7 AI Assistant",
                  description: "Your digital twin works around the clock for you",
                  icon: Bot,
                  color: "bg-purple-50 border-purple-200"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <Card className={`border-2 ${feature.color} hover:shadow-lg transition-all duration-300`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Icon className="w-6 h-6 text-gray-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-black mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-gray-500 mb-4">Trusted by professionals at</p>
              <div className="flex items-center justify-center gap-6 opacity-60">
                {['Google', 'Microsoft', 'Apple', 'Meta'].map((company, index) => (
                  <motion.span
                    key={company}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                    className="text-sm font-semibold text-gray-400"
                  >
                    {company}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}