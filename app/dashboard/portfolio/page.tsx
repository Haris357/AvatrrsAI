"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Eye, Share2, Settings, QrCode, ExternalLink, CreditCard as Edit, ChartBar as BarChart3, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const mockStats = {
  views: 1234,
  uniqueVisitors: 892,
  avgTimeOnSite: '2:34',
  bounceRate: '32%',
  topSources: [
    { name: 'Direct', percentage: 45 },
    { name: 'LinkedIn', percentage: 30 },
    { name: 'Google', percentage: 15 },
    { name: 'Twitter', percentage: 10 }
  ]
};

export default function PortfolioPage() {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Portfolio Overview</h1>
            <p className="text-gray-600">Manage your public portfolio and track performance</p>
          </div>

          {/* Portfolio Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Live Portfolio
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/johndoe" target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href="/dashboard/portfolio/customize">
                          <Edit className="w-4 h-4 mr-2" />
                          Customize
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold text-black mb-2">John Doe</h3>
                    <p className="text-gray-600 mb-4">Senior Full Stack Developer</p>
                    <div className="flex gap-2 justify-center">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                    <span>avatrr.com/johndoe</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Live</span>
                      </div>
                      <Badge variant="outline">Public</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard/portfolio/customize">
                      <Edit className="w-4 h-4 mr-2" />
                      Customize Design
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Portfolio
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Meta Title</span>
                    <Badge variant="secondary">✓ Set</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Meta Description</span>
                    <Badge variant="secondary">✓ Set</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Social Preview</span>
                    <Badge variant="outline">Missing</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-black">{mockStats.views.toLocaleString()}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                    <p className="text-2xl font-bold text-black">{mockStats.uniqueVisitors.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Time</p>
                    <p className="text-2xl font-bold text-black">{mockStats.avgTimeOnSite}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                    <p className="text-2xl font-bold text-black">{mockStats.bounceRate}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStats.topSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{source.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}