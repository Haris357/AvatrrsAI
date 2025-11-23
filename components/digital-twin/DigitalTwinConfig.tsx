"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Settings, 
  MessageCircle, 
  Brain, 
  Save, 
  TestTube,
  Clock,
  User,
  Zap,
  Shield,
  Plus,
  X
} from 'lucide-react';

interface DigitalTwinConfig {
  active: boolean;
  personality: {
    formality: number;
    enthusiasm: number;
    technicalDepth: number;
    responseLength: number;
  };
  knowledgeAreas: string[];
  customIntro: string;
  availability: {
    enabled: boolean;
    schedule: string;
  };
  privacy: {
    canDiscussProjects: boolean;
    canDiscussSalary: boolean;
    canShareContact: boolean;
  };
}

const defaultKnowledgeAreas = [
  'Web Development',
  'React',
  'Node.js',
  'TypeScript',
  'Project Management',
  'UI/UX Design',
  'Database Design',
  'API Development'
];

export function DigitalTwinConfig() {
  const [config, setConfig] = useState<DigitalTwinConfig>({
    active: true,
    personality: {
      formality: 7,
      enthusiasm: 6,
      technicalDepth: 8,
      responseLength: 5
    },
    knowledgeAreas: ['Web Development', 'React', 'Node.js'],
    customIntro: "Hi! I'm John's AI assistant. I can answer questions about his experience, skills, and availability. Feel free to ask me anything!",
    availability: {
      enabled: true,
      schedule: 'business-hours'
    },
    privacy: {
      canDiscussProjects: true,
      canDiscussSalary: false,
      canShareContact: true
    }
  });

  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [newKnowledgeArea, setNewKnowledgeArea] = useState('');

  const updateConfig = (key: keyof DigitalTwinConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updatePersonality = (key: string, value: number[]) => {
    setConfig(prev => ({
      ...prev,
      personality: { ...prev.personality, [key]: value[0] }
    }));
  };

  const addKnowledgeArea = (area: string) => {
    if (area && !config.knowledgeAreas.includes(area)) {
      setConfig(prev => ({
        ...prev,
        knowledgeAreas: [...prev.knowledgeAreas, area]
      }));
    }
  };

  const removeKnowledgeArea = (area: string) => {
    setConfig(prev => ({
      ...prev,
      knowledgeAreas: prev.knowledgeAreas.filter(a => a !== area)
    }));
  };

  const testAI = async () => {
    if (!testMessage.trim()) return;
    
    setIsTesting(true);
    // Simulate AI response
    setTimeout(() => {
      setTestResponse(`Thanks for asking! Based on John's experience with ${config.knowledgeAreas.join(', ')}, I can tell you that he has extensive background in modern web development. He's particularly skilled at building scalable applications and has worked on several successful projects. Would you like to know more about any specific area?`);
      setIsTesting(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Digital Twin AI</h1>
          <p className="text-gray-600">Configure your AI assistant for portfolio visitors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="settings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="personality" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personality
                </TabsTrigger>
                <TabsTrigger value="knowledge" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Knowledge
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      AI Status & Basic Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">AI Assistant Active</Label>
                        <p className="text-sm text-gray-600">Enable AI chat widget on your public profile</p>
                      </div>
                      <Switch
                        checked={config.active}
                        onCheckedChange={(checked) => updateConfig('active', checked)}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="customIntro">Welcome Message</Label>
                      <Textarea
                        id="customIntro"
                        value={config.customIntro}
                        onChange={(e) => updateConfig('customIntro', e.target.value)}
                        placeholder="Customize the first message visitors see..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Availability Schedule</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={config.availability.enabled}
                            onCheckedChange={(checked) => 
                              setConfig(prev => ({
                                ...prev,
                                availability: { ...prev.availability, enabled: checked }
                              }))
                            }
                          />
                          <Label>Show availability status</Label>
                        </div>
                        
                        {config.availability.enabled && (
                          <select
                            value={config.availability.schedule}
                            onChange={(e) => 
                              setConfig(prev => ({
                                ...prev,
                                availability: { ...prev.availability, schedule: e.target.value }
                              }))
                            }
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="always">Always available</option>
                            <option value="business-hours">Business hours only</option>
                            <option value="custom">Custom schedule</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="personality">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Personality Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="flex items-center justify-between">
                          Formality Level
                          <span className="text-sm text-gray-500">{config.personality.formality}/10</span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={[config.personality.formality]}
                            onValueChange={(value) => updatePersonality('formality', value)}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Casual</span>
                            <span>Professional</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          Enthusiasm Level
                          <span className="text-sm text-gray-500">{config.personality.enthusiasm}/10</span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={[config.personality.enthusiasm]}
                            onValueChange={(value) => updatePersonality('enthusiasm', value)}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Reserved</span>
                            <span>Enthusiastic</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          Technical Depth
                          <span className="text-sm text-gray-500">{config.personality.technicalDepth}/10</span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={[config.personality.technicalDepth]}
                            onValueChange={(value) => updatePersonality('technicalDepth', value)}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Simple</span>
                            <span>Technical</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          Response Length
                          <span className="text-sm text-gray-500">{config.personality.responseLength}/10</span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={[config.personality.responseLength]}
                            onValueChange={(value) => updatePersonality('responseLength', value)}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Brief</span>
                            <span>Detailed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="knowledge">
                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Areas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Add Knowledge Area</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newKnowledgeArea}
                          onChange={(e) => setNewKnowledgeArea(e.target.value)}
                          placeholder="e.g., Machine Learning"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addKnowledgeArea(newKnowledgeArea);
                              setNewKnowledgeArea('');
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            addKnowledgeArea(newKnowledgeArea);
                            setNewKnowledgeArea('');
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Current Knowledge Areas</Label>
                      <div className="flex flex-wrap gap-2">
                        {config.knowledgeAreas.map((area) => (
                          <Badge
                            key={area}
                            variant="secondary"
                            className="flex items-center gap-2 px-3 py-1"
                          >
                            {area}
                            <button
                              onClick={() => removeKnowledgeArea(area)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Suggested Areas</Label>
                      <div className="flex flex-wrap gap-2">
                        {defaultKnowledgeAreas
                          .filter(area => !config.knowledgeAreas.includes(area))
                          .map((area) => (
                            <Badge
                              key={area}
                              variant="outline"
                              className="cursor-pointer hover:bg-gray-100"
                              onClick={() => addKnowledgeArea(area)}
                            >
                              {area}
                              <Plus className="w-3 h-3 ml-1" />
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Boundaries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Discuss Projects</Label>
                          <p className="text-sm text-gray-600">Allow AI to share details about your projects</p>
                        </div>
                        <Switch
                          checked={config.privacy.canDiscussProjects}
                          onCheckedChange={(checked) => 
                            setConfig(prev => ({
                              ...prev,
                              privacy: { ...prev.privacy, canDiscussProjects: checked }
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Discuss Salary</Label>
                          <p className="text-sm text-gray-600">Allow AI to discuss salary expectations</p>
                        </div>
                        <Switch
                          checked={config.privacy.canDiscussSalary}
                          onCheckedChange={(checked) => 
                            setConfig(prev => ({
                              ...prev,
                              privacy: { ...prev.privacy, canDiscussSalary: checked }
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Share Contact Info</Label>
                          <p className="text-sm text-gray-600">Allow AI to provide contact information</p>
                        </div>
                        <Switch
                          checked={config.privacy.canShareContact}
                          onCheckedChange={(checked) => 
                            setConfig(prev => ({
                              ...prev,
                              privacy: { ...prev.privacy, canShareContact: checked }
                            }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              <Button className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>

          {/* Test Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5" />
                  Test Your AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testMessage">Ask a question</Label>
                  <Textarea
                    id="testMessage"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="What technologies do you work with?"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={testAI}
                  disabled={!testMessage.trim() || isTesting}
                  className="w-full"
                >
                  {isTesting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Test AI Response
                    </>
                  )}
                </Button>

                {testResponse && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-medium text-gray-700">AI Response:</Label>
                    <p className="text-sm text-gray-900 mt-1">{testResponse}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="w-4 h-4 mr-2" />
                  Retrain AI
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  View Conversations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}