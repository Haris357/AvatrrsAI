"use client";

import { ArrowRight, Sparkles, Target, Users, Zap, Play, CircleCheck as CheckCircle, Star, TrendingUp, Globe, Bot, FileText, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function Hero() {
  const floatingIcons = [
    { icon: FileText, delay: 0, x: 100, y: 50 },
    { icon: Globe, delay: 0.5, x: -80, y: 80 },
    { icon: Bot, delay: 1, x: 120, y: -60 },
    { icon: Briefcase, delay: 1.5, x: -100, y: -40 },
    { icon: TrendingUp, delay: 2, x: 80, y: 100 },
    { icon: Target, delay: 2.5, x: -120, y: 20 }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-black/5 to-gray-300/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-l from-gray-400/10 to-black/5 rounded-full blur-3xl" 
        />
        
        {/* Floating icons */}
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0.1, 0.3],
                scale: [0, 1, 1.1, 1],
                x: [0, item.x, item.x + 20, item.x],
                y: [0, item.y, item.y - 10, item.y]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                delay: item.delay,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Icon className="w-8 h-8 text-gray-400" />
            </motion.div>
          );
        })}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 py-3 text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span>🎉 Now with AI Digital Twins - Launch Special</span>
            <Badge variant="secondary" className="bg-white text-black text-xs">
              NEW
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold text-black mb-8 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Build Your
            </motion.span>
            <span className="block">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent"
              >
                Digital Empire
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Create ATS-optimized resumes, stunning portfolios, deploy AI digital twins, 
            find remote opportunities, and generate winning proposals. 
            <span className="block mt-2 text-black font-medium">Your complete professional ecosystem.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="group bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                <Link href="/signin">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="group border-2 border-gray-300 hover:border-black px-8 py-4 text-lg rounded-xl">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-8 mb-16 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>50,000+ Professionals</span>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-sm text-gray-500 mb-6">Trusted by professionals at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Google', 'Microsoft', 'Apple', 'Meta', 'Netflix', 'Spotify'].map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  className="text-lg font-semibold text-gray-400 hover:text-black transition-colors cursor-pointer"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature Preview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              {
                icon: FileText,
                title: "ATS-Optimized Resumes",
                description: "AI-powered analysis with 95% pass rate",
                color: "bg-blue-50 border-blue-200"
              },
              {
                icon: Globe,
                title: "Stunning Portfolios",
                description: "AI-designed websites in minutes",
                color: "bg-purple-50 border-purple-200"
              },
              {
                icon: Bot,
                title: "AI Digital Twins",
                description: "24/7 AI assistant for your profile",
                color: "bg-green-50 border-green-200"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`p-6 rounded-2xl border-2 ${feature.color} backdrop-blur-sm`}
                >
                  <Icon className="w-8 h-8 text-gray-700 mb-4" />
                  <h3 className="font-semibold text-black mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-black text-white rounded-3xl p-8 md:p-12 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of professionals who've accelerated their careers with Avatrr
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg rounded-xl">
                <Link href="/signin">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}