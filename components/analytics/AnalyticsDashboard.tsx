"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MessageCircle, 
  FileText, 
  Target,
  Globe,
  Calendar,
  Download,
  Share2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const profileViewsData = [
  { date: '2024-01-01', views: 45, unique: 32 },
  { date: '2024-01-02', views: 52, unique: 38 },
  { date: '2024-01-03', views: 48, unique: 35 },
  { date: '2024-01-04', views: 61, unique: 42 },
  { date: '2024-01-05', views: 55, unique: 39 },
  { date: '2024-01-06', views: 67, unique: 48 },
  { date: '2024-01-07', views: 73, unique: 52 }
];

const proposalData = [
  { month: 'Jan', generated: 12, sent: 8, responses: 3, success: 1 },
  { month: 'Feb', generated: 15, sent: 12, responses: 5, success: 2 },
  { month: 'Mar', generated: 18, sent: 14, responses: 6, success: 3 },
  { month: 'Apr', generated: 22, sent: 18, responses: 8, success: 4 },
  { month: 'May', generated: 25, sent: 20, responses: 9, success: 5 }
];

const jobApplicationData = [
  { name: 'Applied', value: 45, color: '#3B82F6' },
  { name: 'In Review', value: 12, color: '#F59E0B' },
  { name: 'Interviewing', value: 8, color: '#10B981' },
  { name: 'Offers', value: 3, color: '#8B5CF6' },
  { name: 'Rejected', value: 22, color: '#EF4444' }
];

const digitalTwinData = [
  { date: '2024-01-01', conversations: 5, messages: 23 },
  { date: '2024-01-02', conversations: 8, messages: 34 },
  { date: '2024-01-03', conversations: 6, messages: 28 },
  { date: '2024-01-04', conversations: 12, messages: 45 },
  { date: '2024-01-05', conversations: 9, messages: 38 },
  { date: '2024-01-06', conversations: 15, messages: 52 },
  { date: '2024-01-07', conversations: 11, messages: 41 }
];

const topQuestions = [
  { question: "What technologies do you work with?", count: 23 },
  { question: "Are you available for freelance work?", count: 18 },
  { question: "Can you tell me about your experience?", count: 15 },
  { question: "What's your hourly rate?", count: 12 },
  { question: "Do you work remotely?", count: 10 }
];

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
}

function MetricCard({ title, value, change, changeType, icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-black">{value}</p>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'increase' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                {change}
              </div>
            </div>
          </div>
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your professional presence and performance</p>
          </div>
          <div className="flex gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile Performance</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="digital-twin">Digital Twin</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Profile Views"
                value="1,234"
                change="+12%"
                changeType="increase"
                icon={Eye}
              />
              <MetricCard
                title="Proposal Success"
                value="78%"
                change="+5%"
                changeType="increase"
                icon={Target}
              />
              <MetricCard
                title="AI Conversations"
                value="156"
                change="+23%"
                changeType="increase"
                icon={MessageCircle}
              />
              <MetricCard
                title="Job Applications"
                value="45"
                change="+8"
                changeType="increase"
                icon={FileText}
              />
            </div>

            {/* Overview Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Views Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={profileViewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="views" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                      <Area type="monotone" dataKey="unique" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Application Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={jobApplicationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {jobApplicationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Views Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={profileViewsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} />
                        <Line type="monotone" dataKey="unique" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Direct</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/5 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">LinkedIn</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/4 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Google</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/6 h-full bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">United States</span>
                      <Badge variant="secondary">45%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Canada</span>
                      <Badge variant="secondary">20%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">United Kingdom</span>
                      <Badge variant="secondary">15%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Germany</span>
                      <Badge variant="secondary">10%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Other</span>
                      <Badge variant="secondary">10%</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={proposalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="generated" fill="#3B82F6" name="Generated" />
                      <Bar dataKey="sent" fill="#10B981" name="Sent" />
                      <Bar dataKey="responses" fill="#F59E0B" name="Responses" />
                      <Bar dataKey="success" fill="#8B5CF6" name="Success" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">78%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Generated</span>
                      <span className="font-medium">92</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Sent</span>
                      <span className="font-medium">72</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Responses Received</span>
                      <span className="font-medium">31</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Jobs Won</span>
                      <span className="font-medium">15</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">$45,000</div>
                      <div className="text-sm text-gray-600">Total Earnings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="digital-twin" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Conversations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={digitalTwinData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="conversations" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="messages" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Questions Asked</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topQuestions.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm flex-1 mr-4">{item.question}</span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-black">156</div>
                  <div className="text-sm text-gray-600">Total Conversations</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-black">4.2</div>
                  <div className="text-sm text-gray-600">Avg Messages per Chat</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-black">89%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}