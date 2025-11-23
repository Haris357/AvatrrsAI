"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Globe, 
  Search, 
  PenTool, 
  TrendingUp, 
  Users, 
  Target,
  Plus
} from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    title: 'Edit Resume',
    description: 'Update your resume and improve ATS score',
    icon: FileText,
    href: '/dashboard/resume',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Customize Portfolio',
    description: 'Design your professional portfolio',
    icon: Globe,
    href: '/dashboard/portfolio/customize',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Browse Jobs',
    description: 'Find remote opportunities',
    icon: Search,
    href: '/dashboard/opportunities',
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Generate Proposal',
    description: 'Create winning proposals with AI',
    icon: PenTool,
    href: '/dashboard/proposals',
    color: 'bg-orange-50 text-orange-600'
  }
];

const stats = [
  {
    title: 'Profile Views',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    icon: Users
  },
  {
    title: 'Active Applications',
    value: '8',
    change: '+2',
    changeType: 'increase',
    icon: Target
  },
  {
    title: 'Proposal Success',
    value: '78%',
    change: '+5%',
    changeType: 'increase',
    icon: TrendingUp
  },
  {
    title: 'ATS Score',
    value: '87',
    change: '+3',
    changeType: 'increase',
    icon: FileText
  }
];

export default function DashboardPage() {
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
      
      <main className="md:ml-72 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Welcome back, {user.displayName?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your professional presence.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {stat.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-2xl font-bold text-black">
                              {stat.value}
                            </p>
                            <span className={`text-sm font-medium ${
                              stat.changeType === 'increase' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-gray-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.title}
                        variant="ghost"
                        className="h-auto p-4 justify-start"
                        asChild
                      >
                        <Link href={action.href}>
                          <div className="text-left w-full">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <p className="font-medium text-black mb-1">
                              {action.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {action.description}
                            </p>
                          </div>
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">
                        Profile viewed 5 times today
                      </p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">
                        New job matches found
                      </p>
                      <p className="text-xs text-gray-600">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">
                        ATS score improved to 87
                      </p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}