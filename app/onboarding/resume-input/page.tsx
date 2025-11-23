"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Loader as Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResumeInputPage() {
  const [inputType, setInputType] = useState<'upload' | 'text' | null>(null);
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) { // 5MB limit
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      router.push('/onboarding/ats-analysis');
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-black mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-black mb-2">
            Analyzing Your Profile
          </h2>
          <p className="text-gray-600">
            Our AI is processing your information...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-black mb-2">
            Tell Us About Yourself
          </h1>
          <p className="text-gray-600">
            Choose how you'd like to share your professional information
          </p>
        </motion.div>

        {!inputType ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer hover:shadow-lg transition-shadow group"
                onClick={() => setInputType('upload')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle>Upload Resume/CV</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Upload your existing resume or CV file (PDF, DOCX)
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Quick and easy setup</li>
                    <li>• Automatic information extraction</li>
                    <li>• Supports PDF and Word formats</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card 
                className="h-full cursor-pointer hover:shadow-lg transition-shadow group"
                onClick={() => setInputType('text')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle>Type Description</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    Describe your experience, skills, and achievements
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• More control over information</li>
                    <li>• Include specific details</li>
                    <li>• Perfect for custom formatting</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {inputType === 'upload' ? (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Your Resume
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Describe Yourself
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {inputType === 'upload' ? (
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-black mb-2">
                          Drop your file here or click to browse
                        </p>
                        <p className="text-gray-600">
                          PDF or Word document, max 5MB
                        </p>
                      </label>
                      
                      {file && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-3 bg-green-50 rounded-lg"
                        >
                          <p className="text-green-700 font-medium">
                            ✓ {file.name}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <Textarea
                      placeholder="Tell us about your projects, certificates, experiences, achievements, contact info, websites, skills, education..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={12}
                      className="resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {textInput.length} characters
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setInputType(null)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!file && !textInput.trim()}
                    className="flex-1"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}