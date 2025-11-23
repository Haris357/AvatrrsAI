"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2, 
  Download, 
  Share2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin,
  ExternalLink,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  X
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface PublicProfileProps {
  username: string;
}

const mockProfile = {
  name: "John Doe",
  title: "Senior Full Stack Developer",
  location: "San Francisco, CA",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  website: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  avatar: null,
  summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love solving complex problems and creating user-friendly solutions.",
  skills: [
    "React", "Node.js", "TypeScript", "Python", "AWS", "Docker", 
    "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "CI/CD"
  ],
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Lead development of microservices architecture serving 1M+ users. Built React applications with Node.js backends."
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Developed MVP from scratch using React and Express. Implemented real-time features with WebSocket."
    }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of California",
      period: "2016 - 2020"
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      url: "https://example.com",
      github: "https://github.com/johndoe/ecommerce"
    },
    {
      name: "Task Management App",
      description: "Real-time collaborative task management with drag-and-drop interface",
      technologies: ["React", "Socket.io", "MongoDB", "Express"],
      url: "https://taskapp.example.com",
      github: "https://github.com/johndoe/taskapp"
    }
  ],
  certificates: [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer"
  ]
};

export function PublicProfile({ username }: PublicProfileProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm ${mockProfile.name}'s AI assistant. I can answer questions about his experience, skills, and availability. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `${mockProfile.name} has extensive experience with ${mockProfile.skills.slice(0, 3).join(', ')} and has worked on projects involving ${mockProfile.projects[0].technologies.join(', ')}. Would you like to know more about any specific area?`,
        `Based on ${mockProfile.name}'s background, he's currently working as a ${mockProfile.experience[0].title} at ${mockProfile.experience[0].company}. He's passionate about building scalable applications and has ${mockProfile.experience.length}+ years of professional experience.`,
        `${mockProfile.name} is skilled in both frontend and backend development. His recent projects include ${mockProfile.projects.map(p => p.name).join(' and ')}. Feel free to check out his portfolio or reach out directly!`
      ];

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${mockProfile.name} - ${mockProfile.title}`,
        text: mockProfile.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {mockProfile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {mockProfile.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">
              {mockProfile.title}
            </p>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              {mockProfile.summary}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button size="lg" className="group">
                <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {mockProfile.location}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {mockProfile.email}
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a href={mockProfile.website} className="hover:text-black transition-colors">
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Skills & Technologies</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {mockProfile.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-12 text-center">Experience</h2>
            <div className="space-y-8">
              {mockProfile.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-black mb-1">{exp.title}</h3>
                          <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
                          <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-12 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mockProfile.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Code className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-black mb-2">{project.name}</h3>
                          <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Education & Certificates */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-black mb-6">Education</h2>
                {mockProfile.education.map((edu, index) => (
                  <Card key={index} className="mb-4">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black mb-1">{edu.degree}</h3>
                          <p className="text-gray-600 mb-1">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.period}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black mb-6">Certifications</h2>
                <div className="space-y-3">
                  {mockProfile.certificates.map((cert, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                          <span className="text-gray-900">{cert}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-black">AI Assistant</p>
                  <p className="text-xs text-gray-500">Ask me anything!</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatMinimized(!chatMinimized)}
                >
                  {chatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!chatMinimized && (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            message.role === 'user'
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {message.content}
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 text-gray-900 p-3 rounded-lg text-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about experience, skills..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gray-800 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
        </motion.button>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              © 2024 {mockProfile.name}. Built with Avatrr.
            </p>
            <div className="flex justify-center gap-6">
              <a href={mockProfile.github} className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={mockProfile.linkedin} className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${mockProfile.email}`} className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}