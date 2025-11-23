"use client";

import { motion } from 'framer-motion';
import { FileText, Globe, Bot, Search, PenTool, ChartBar as BarChart3, ArrowRight, CircleCheck as CheckCircle, Zap, Shield, Clock, Star, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: FileText,
    title: "ATS-Optimized Resume Builder",
    description: "AI-powered resume analysis with real-time ATS scoring. Get past applicant tracking systems with optimized formatting and keywords.",
    benefits: ["95%+ ATS pass rate", "Real-time scoring", "Industry templates", "Keyword optimization"],
    badge: "Most Popular"
  },
  {
    icon: Globe,
    title: "Stunning Portfolio Websites",
    description: "Create beautiful, responsive portfolios with AI assistance. Customize everything through natural conversation.",
    benefits: ["AI-powered design", "Mobile responsive", "SEO optimized", "Custom domains"],
    badge: "New"
  },
  {
    icon: Bot,
    title: "AI Digital Twin",
    description: "Deploy an AI version of yourself on your portfolio. Let visitors interact with your digital twin 24/7.",
    benefits: ["24/7 availability", "Natural conversations", "Lead generation", "Personal branding"],
    badge: "Featured"
  },
  {
    icon: Search,
    title: "Remote Job Finder",
    description: "Access thousands of remote opportunities from multiple job boards. Smart filtering and personalized recommendations.",
    benefits: ["15,000+ jobs daily", "Smart filters", "Auto-matching", "Application tracking"],
    badge: null
  },
  {
    icon: PenTool,
    title: "AI Proposal Generator",
    description: "Create winning freelance proposals in seconds. AI analyzes job posts and personalizes proposals for maximum success.",
    benefits: ["85%+ response rate", "Personalized content", "Template library", "Success tracking"],
    badge: "Hot"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track your professional growth with detailed analytics. Monitor profile views, proposal performance, and job applications.",
    benefits: ["Profile analytics", "Success metrics", "Performance insights", "Goal tracking"],
    badge: null
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer at Google",
    content: "Avatrr helped me land my dream job at Google. The ATS optimization increased my interview rate by 300%!",
    avatar: "SC"
  },
  {
    name: "Marcus Johnson",
    role: "Freelance Designer",
    content: "The AI proposal generator is incredible. My response rate went from 20% to 80% in just one month.",
    avatar: "MJ"
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager at Meta",
    content: "The digital twin feature is revolutionary. It's like having a personal assistant working 24/7 for my career.",
    avatar: "ER"
  }
];

export function Features() {
  return (
    <section id="features" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Dominate Your Industry
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From AI-powered resume optimization to intelligent job matching, 
            we've revolutionized every aspect of your professional journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-gray-200 shadow-sm bg-white relative overflow-hidden">
                  {feature.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black text-white text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-black group-hover:to-gray-800 group-hover:text-white transition-all duration-500 shadow-sm"
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>
                      <div className="flex-1 relative z-10">
                        <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-gray-900 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 relative z-10">
                      {feature.benefits.map((benefit) => (
                        <motion.div 
                          key={benefit} 
                          className="flex items-center gap-3"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <Button variant="ghost" className="text-black hover:bg-black hover:text-white transition-all duration-300">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-32 mb-20"
        >
          <div className="bg-black text-white rounded-3xl p-8 md:p-16 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Professionals Worldwide
              </h3>
              <p className="text-gray-300 text-lg">
                Join the thousands who've transformed their careers with Avatrr
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Active Users", icon: Users },
                { number: "95%", label: "ATS Pass Rate", icon: Target },
                { number: "10x", label: "Faster Hiring", icon: Clock },
                { number: "4.9★", label: "User Rating", icon: Star }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-black mb-4">
              What Our Users Say
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from professionals who've accelerated their careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full bg-white border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-black">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="group bg-black hover:bg-gray-800 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300" asChild>
              <a href="/(auth)/signin">
                <Shield className="mr-3 w-6 h-6" />
                Start Building Your Empire
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>
          <p className="text-gray-500 mt-4 text-sm">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
}