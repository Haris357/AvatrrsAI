"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase 
} from 'lucide-react';

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

interface JobFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
];

const experienceLevels = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Lead/Principal',
  'Executive'
];

const popularSkills = [
  'React', 'Node.js', 'TypeScript', 'Python', 'JavaScript',
  'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB',
  'PostgreSQL', 'Redis', 'Git', 'CI/CD', 'Microservices'
];

const postedWithinOptions = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: 'all', label: 'All time' }
];

export function JobFilters({ filters, onFiltersChange, onClearFilters }: JobFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleJobType = (type: string) => {
    const newTypes = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter(t => t !== type)
      : [...filters.jobTypes, type];
    updateFilter('jobTypes', newTypes);
  };

  const toggleExperienceLevel = (level: string) => {
    const newLevels = filters.experienceLevels.includes(level)
      ? filters.experienceLevels.filter(l => l !== level)
      : [...filters.experienceLevels, level];
    updateFilter('experienceLevels', newLevels);
  };

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    updateFilter('skills', newSkills);
  };

  const hasActiveFilters = () => {
    return filters.search ||
           filters.jobTypes.length > 0 ||
           filters.experienceLevels.length > 0 ||
           filters.skills.length > 0 ||
           filters.location ||
           filters.remote ||
           filters.postedWithin !== 'all' ||
           filters.salaryRange[0] > 0 ||
           filters.salaryRange[1] < 200000;
  };

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Jobs</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Job title, company, keywords..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="location"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              placeholder="City, state, country..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Remote Work */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote"
            checked={filters.remote}
            onCheckedChange={(checked) => updateFilter('remote', checked)}
          />
          <Label htmlFor="remote">Remote work only</Label>
        </div>

        {/* Job Type */}
        <div className="space-y-3">
          <Label>Job Type</Label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.jobTypes.includes(type)}
                  onCheckedChange={() => toggleJobType(type)}
                />
                <Label htmlFor={type} className="text-sm">{type}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Posted Within */}
        <div className="space-y-3">
          <Label>Posted Within</Label>
          <div className="space-y-2">
            {postedWithinOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={filters.postedWithin === option.value}
                  onCheckedChange={() => updateFilter('postedWithin', option.value)}
                />
                <Label htmlFor={option.value} className="text-sm">{option.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full justify-center"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </Button>

        {/* Advanced Filters */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            {/* Salary Range */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Salary Range
              </Label>
              <div className="px-2">
                <Slider
                  value={filters.salaryRange}
                  onValueChange={(value) => updateFilter('salaryRange', value as [number, number])}
                  max={200000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>${filters.salaryRange[0].toLocaleString()}</span>
                  <span>${filters.salaryRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-3">
              <Label>Experience Level</Label>
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={level}
                      checked={filters.experienceLevels.includes(level)}
                      onCheckedChange={() => toggleExperienceLevel(level)}
                    />
                    <Label htmlFor={level} className="text-sm">{level}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2">
                {popularSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={filters.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                    {filters.skills.includes(skill) && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters() && (
          <div className="pt-4 border-t border-gray-200">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Active Filters
            </Label>
            <div className="flex flex-wrap gap-1">
              {filters.jobTypes.map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type}
                </Badge>
              ))}
              {filters.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {filters.remote && (
                <Badge variant="secondary" className="text-xs">
                  Remote
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}