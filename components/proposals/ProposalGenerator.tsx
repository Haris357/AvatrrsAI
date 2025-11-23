"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wand as Wand2, Copy, Download, Send, RefreshCw, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Lightbulb, Target, Clock, FileText } from 'lucide-react';

interface ProposalConfig {
  jobUrl: string;
  jobDescription: string;
  tone: string;
  length: string;
  focusAreas: string[];
  includePortfolio: boolean;
  customInstructions: string;
}

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'confident', label: 'Confident' },
  { value: 'creative', label: 'Creative' },
  { value: 'technical', label: 'Technical' }
];

const lengthOptions = [
  { value: 'brief', label: 'Brief (150-200 words)' },
  { value: 'standard', label: 'Standard (250-350 words)' },
  { value: 'detailed', label: 'Detailed (400-500 words)' }
];

const focusAreaOptions = [
  'Skills match',
  'Past experience',
  'Enthusiasm',
  'Portfolio showcase',
  'Availability',
  'Budget discussion'
];

export function ProposalGenerator() {
  const [config, setConfig] = useState<ProposalConfig>({
    jobUrl: '',
    jobDescription: '',
    tone: 'professional',
    length: 'standard',
    focusAreas: ['Skills match', 'Past experience'],
    includePortfolio: true,
    customInstructions: ''
  });

  const [generatedProposal, setGeneratedProposal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockProposal = `Dear Hiring Manager,

I'm excited to apply for the ${config.jobDescription.includes('developer') ? 'Developer' : 'Position'} role at your company. With my extensive experience in modern web technologies and a proven track record of delivering high-quality solutions, I'm confident I can contribute significantly to your team.

My expertise includes:
• Full-stack development with React, Node.js, and TypeScript
• Cloud deployment and DevOps practices
• Agile development methodologies
• Strong problem-solving and communication skills

I've successfully completed similar projects, including building scalable web applications that serve thousands of users. My portfolio showcases my ability to create clean, efficient code while maintaining excellent user experience.

I'm available to start immediately and would love to discuss how my skills align with your project requirements. I'm committed to delivering exceptional results within your timeline and budget.

Looking forward to hearing from you!

Best regards,
[Your Name]`;

      setGeneratedProposal(mockProposal);
      setOptimizationScore(87);
      setSuggestions([
        'Consider mentioning specific technologies from the job posting',
        'Add a brief timeline estimate for the project',
        'Include a call-to-action question to encourage response'
      ]);
      setIsGenerating(false);
    }, 3000);
  };

  const updateConfig = (key: keyof ProposalConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleFocusArea = (area: string) => {
    const newAreas = config.focusAreas.includes(area)
      ? config.focusAreas.filter(a => a !== area)
      : [...config.focusAreas, area];
    updateConfig('focusAreas', newAreas);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Proposal Generator</h1>
          <p className="text-gray-600">Create winning proposals with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobUrl">Job URL (Optional)</Label>
                  <Input
                    id="jobUrl"
                    value={config.jobUrl}
                    onChange={(e) => updateConfig('jobUrl', e.target.value)}
                    placeholder="https://example.com/job-posting"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    value={config.jobDescription}
                    onChange={(e) => updateConfig('jobDescription', e.target.value)}
                    placeholder="Paste the job description here..."
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  AI Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={config.tone} onValueChange={(value) => updateConfig('tone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Length</Label>
                  <Select value={config.length} onValueChange={(value) => updateConfig('length', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Focus Areas</Label>
                  <div className="space-y-2">
                    {focusAreaOptions.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={area}
                          checked={config.focusAreas.includes(area)}
                          onChange={() => toggleFocusArea(area)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={area} className="text-sm">{area}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customInstructions">Custom Instructions</Label>
                  <Textarea
                    id="customInstructions"
                    value={config.customInstructions}
                    onChange={(e) => updateConfig('customInstructions', e.target.value)}
                    placeholder="Any specific requirements or preferences..."
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={!config.jobDescription.trim() || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Proposal
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Proposal Preview */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generated Proposal
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedProposal ? (
                  <div className="space-y-4">
                    <Textarea
                      value={generatedProposal}
                      onChange={(e) => setGeneratedProposal(e.target.value)}
                      rows={20}
                      className="resize-none"
                    />
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    </div>

                    <div className="text-sm text-gray-600 text-center">
                      {generatedProposal.split(' ').length} words • {generatedProposal.length} characters
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">No proposal generated yet</p>
                    <p className="text-sm text-gray-500">
                      Fill in the job details and click "Generate Proposal"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Optimization Panel */}
          <div className="lg:col-span-1 space-y-6">
            {optimizationScore > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Optimization Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={`text-3xl font-bold ${getScoreColor(optimizationScore)}`}>
                      {optimizationScore}/100
                    </div>
                    <Progress value={optimizationScore} className="mt-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Strong opening hook</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Relevant skills highlighted</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span>Could include more specifics</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                        <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate 3 Variations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Save as Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Send className="w-4 h-4 mr-2" />
                  Send Test Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}