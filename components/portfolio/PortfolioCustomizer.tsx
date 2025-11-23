"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Minimize2, Maximize2, History, Palette, LayoutGrid as Layout, Type, Save, Eye, Share2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const examplePrompts = [
  "Make it more colorful and modern",
  "Add a dark mode toggle",
  "Create a projects showcase section",
  "Change the layout to be more creative",
  "Add animations to the hero section",
  "Make the typography more elegant"
];

export function PortfolioCustomizer() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you customize your portfolio. You can ask me to change colors, layouts, add sections, or modify any aspect of your design. What would you like to work on?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatMinimized, setChatMinimized] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'll help you ${inputMessage.toLowerCase()}. I've updated your portfolio design. You can see the changes in the preview above. Would you like me to make any adjustments?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const useExamplePrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Portfolio Customizer</h1>
            <p className="text-gray-600">Design your portfolio with AI assistance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Portfolio Preview */}
        <div className="flex-1 p-6">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-black rounded-full mx-auto mb-6"></div>
                  <h2 className="text-3xl font-bold text-black mb-2">John Doe</h2>
                  <p className="text-xl text-gray-600 mb-6">Full Stack Developer</p>
                  <div className="flex gap-4 justify-center">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
          {/* Chat History Toggle */}
          <div className="p-4 border-b border-gray-200">
            <Button
              variant="ghost"
              onClick={() => setHistoryOpen(!historyOpen)}
              className="w-full justify-start"
            >
              <History className="w-4 h-4 mr-2" />
              Chat History
            </Button>
          </div>

          {/* Chat History Panel */}
          <AnimatePresence>
            {historyOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 200 }}
                exit={{ height: 0 }}
                className="border-b border-gray-200 overflow-hidden"
              >
                <ScrollArea className="h-full p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Previous Sessions</div>
                    <div className="space-y-1">
                      <div className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                        Portfolio redesign - Yesterday
                      </div>
                      <div className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                        Color scheme update - 2 days ago
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Chat Interface */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">AI Designer</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatMinimized(!chatMinimized)}
              >
                {chatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
            </div>

            <AnimatePresence>
              {!chatMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Example Prompts */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-3">Try these prompts:</div>
                    <div className="space-y-2">
                      {examplePrompts.slice(0, 3).map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => useExamplePrompt(prompt)}
                          className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded block w-full text-left transition-colors"
                        >
                          "{prompt}"
                        </button>
                      ))}
                    </div>
                  </div>

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

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Describe what you want to change..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}