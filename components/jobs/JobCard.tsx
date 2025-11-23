"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck,
  ExternalLink,
  PenTool
} from 'lucide-react';
import { useState } from 'react';

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

interface JobCardProps {
  job: Job;
  onSave?: (jobId: string) => void;
  onGenerateProposal?: (job: Job) => void;
  onViewDetails?: (job: Job) => void;
}

export function JobCard({ job, onSave, onGenerateProposal, onViewDetails }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(job.saved || false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(job.id);
  };

  const formatSalary = () => {
    if (job.salary) return job.salary;
    if (job.salaryMin && job.salaryMax) {
      return `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`;
    }
    return 'Salary not specified';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={job.company}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    {job.company.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-black text-lg mb-1 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600 font-medium">{job.company}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              className="text-gray-400 hover:text-yellow-500"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-yellow-500" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {job.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>

          {/* Job Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
              {job.remote && (
                <Badge variant="outline" className="text-xs">
                  Remote
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{formatSalary()}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{getTimeAgo(job.postedDate)}</span>
              <Badge variant="outline" className="text-xs ml-auto">
                {job.type}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(job);
              }}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onGenerateProposal?.(job);
              }}
              className="flex-1"
            >
              <PenTool className="w-4 h-4 mr-2" />
              Generate Proposal
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}