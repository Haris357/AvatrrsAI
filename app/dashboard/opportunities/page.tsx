"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid3x3 as Grid3X3, List, RefreshCw, Bookmark, TrendingUp } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  location: string;
  remote: boolean;
  type: string;
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  skills: string[];
  postedDate: string;
  url: string;
  saved?: boolean;
}

interface FilterState {
  search: string;
  jobTypes: string[];
  experienceLevels: string[];
  skills: string[];
  salaryRange: [number, number];
  location: string;
  remote: boolean;
  postedWithin: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Inc.',
    description: 'We are looking for a senior full stack developer to join our growing team. You will be responsible for developing and maintaining web applications using React, Node.js, and TypeScript.',
    location: 'San Francisco, CA',
    remote: true,
    type: 'Full-time',
    salaryMin: 120000,
    salaryMax: 180000,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    postedDate: '2024-01-15T10:00:00Z',
    url: 'https://example.com/job/1'
  },
  {
    id: '2',
    title: 'Frontend React Developer',
    company: 'StartupXYZ',
    description: 'Join our dynamic startup as a frontend developer. Work with cutting-edge technologies and help build the next generation of web applications.',
    location: 'Remote',
    remote: true,
    type: 'Contract',
    salaryMin: 80000,
    salaryMax: 120000,
    skills: ['React', 'JavaScript', 'CSS', 'Redux', 'Jest'],
    postedDate: '2024-01-14T15:30:00Z',
    url: 'https://example.com/job/2'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    description: 'We need an experienced DevOps engineer to help scale our infrastructure. Experience with Kubernetes, Docker, and CI/CD pipelines required.',
    location: 'Austin, TX',
    remote: false,
    type: 'Full-time',
    salaryMin: 100000,
    salaryMax: 150000,
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins'],
    postedDate: '2024-01-13T09:15:00Z',
    url: 'https://example.com/job/3'
  }
];

export default function OpportunitiesPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    jobTypes: [],
    experienceLevels: [],
    skills: [],
    salaryRange: [0, 200000],
    location: '',
    remote: false,
    postedWithin: 'all'
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Apply filters
    let filtered = jobs;

    if (filters.search) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.jobTypes.length > 0) {
      filtered = filtered.filter(job => filters.jobTypes.includes(job.type));
    }

    if (filters.remote) {
      filtered = filtered.filter(job => job.remote);
    }

    if (filters.skills.length > 0) {
      filtered = filtered.filter(job => 
        filters.skills.some(skill => job.skills.includes(skill))
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleSaveJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };

  const handleGenerateProposal = (job: Job) => {
    router.push(`/dashboard/proposals?jobId=${job.id}`);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      jobTypes: [],
      experienceLevels: [],
      skills: [],
      salaryRange: [0, 200000],
      location: '',
      remote: false,
      postedWithin: 'all'
    });
  };

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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">Job Opportunities</h1>
                <p className="text-gray-600">Discover remote opportunities tailored for you</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <div className="flex border border-gray-200 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Search jobs, companies, or keywords..."
                className="pl-12 h-12 text-lg"
              />
            </div>

            {/* Category Tabs */}
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="remote">Remote Only</TabsTrigger>
                <TabsTrigger value="freelance">Freelance</TabsTrigger>
                <TabsTrigger value="contract">Contract</TabsTrigger>
                <TabsTrigger value="fulltime">Full-time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <div className="w-80 flex-shrink-0">
              <JobFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Jobs List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {filteredJobs.length} jobs found
                  </span>
                  {filters.search && (
                    <Badge variant="secondary">
                      Search: "{filters.search}"
                    </Badge>
                  )}
                  {filters.remote && (
                    <Badge variant="secondary">Remote Only</Badge>
                  )}
                </div>
              </div>

              {filteredJobs.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 xl:grid-cols-2' 
                    : 'grid-cols-1'
                }`}>
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <JobCard
                        job={job}
                        onSave={handleSaveJob}
                        onGenerateProposal={handleGenerateProposal}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}