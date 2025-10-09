"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Mic, 
  BarChart3, 
  MessageSquare, 
  Upload, 
  Play,
  Clock,
  Trophy,
  TrendingUp,
  User,
  FileText,
  Star,
  Target,
  Zap,
  CheckCircle2,
  X,
  Loader2
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock data - replace with actual API data later
  const userStats = {
    interviewsCompleted: 12,
    averageScore: 76,
    skillsPracticed: 8,
    timePracticed: '4h 23m',
    readinessScore: 65
  };

  const recentSessions = [
    { id: 1, type: 'Technical Interview', mode: 'mock', score: 82, date: '2024-01-15', duration: '25m' },
    { id: 2, type: 'Behavioral Questions', mode: 'practice', score: 75, date: '2024-01-14', duration: '18m' },
    { id: 3, type: 'System Design', mode: 'mock', score: 88, date: '2024-01-12', duration: '32m' },
  ];

  const skillAreas = [
    { name: 'Communication', score: 82, improvement: 12 },
    { name: 'Technical Knowledge', score: 78, improvement: 8 },
    { name: 'Confidence', score: 65, improvement: 15 },
    { name: 'Body Language', score: 71, improvement: 5 },
  ];

  const handleStartMockInterview = () => {
    router.push('/mock-interview');
  };

  const handleStartPractice = () => {
    router.push('/practice');
  };

  // ADD THIS FUNCTION - Profile navigation handler
  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['.pdf', '.docx', '.doc', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const fileType = file.type;
      
      if (!allowedTypes.includes(fileExtension) && !allowedTypes.includes(fileType)) {
        setUploadError('Please upload a PDF or Word document (PDF, DOC, DOCX)');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size must be less than 5MB');
        return;
      }

      setUploadError(null);
      setCvFile(file);
      setUploadSuccess(false);
    }
  };

  const handleFileUpload = async () => {
    if (!cvFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Simulate upload process - replace with actual API call
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Here you would typically send the file to your backend
      // Example:
      // const formData = new FormData();
      // formData.append('cv', cvFile);
      // const response = await fetch('/api/upload-cv', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // if (!response.ok) throw new Error('Upload failed');

      console.log('CV uploaded successfully:', cvFile.name);
      setUploadSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload CV. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    setUploadError(null);
    setUploadSuccess(false);
    // Reset file input
    const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleAnalyzeRole = () => {
    if (jobDescription.trim()) {
      // TODO: Send to backend for analysis and question generation
      console.log('Analyzing job description:', jobDescription);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Interview Coach
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* FIXED: Added onClick handler to Profile button */}
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleProfileClick}  // This was missing!
              >
                <User className="w-4 h-4" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your dashboard code remains the same */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Interview Prep Hub! 🚀</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get ready for your dream job with personalized AI coaching and realistic interview simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dual Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mock Interview Card */}
              <Card className="bg-gradient-to-br from-purple-500 to-blue-500 text-white border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Video className="w-6 h-6" />
                    Mock Interview
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Full simulated interview experience with comprehensive feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-purple-100 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Adaptive question sequencing
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Multi-modal analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Detailed feedback report
                    </li>
                  </ul>
                  <Button 
                    onClick={handleStartMockInterview}
                    className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                    size="lg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Mock Interview
                  </Button>
                </CardContent>
              </Card>

              {/* Practice Mode Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <Mic className="w-6 h-6 text-purple-600" />
                    Practice Mode
                  </CardTitle>
                  <CardDescription>
                    Quick practice sessions with instant feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-500" />
                      Instant feedback after each answer
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      Role-specific questions
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      STAR method guidance
                    </li>
                  </ul>
                  <Button 
                    onClick={handleStartPractice}
                    variant="outline" 
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold"
                    size="lg"
                  >
                    Start Practice Session
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Personalization Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Description Input */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Target Role Analysis
                  </CardTitle>
                  <CardDescription>
                    Get personalized questions for your dream job
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste the job description here to generate role-specific questions..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <Button 
                    onClick={handleAnalyzeRole}
                    disabled={!jobDescription.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Analyze & Generate Questions
                  </Button>
                </CardContent>
              </Card>

              {/* CV Upload - Enhanced */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-purple-600" />
                    Upload Your CV
                  </CardTitle>
                  <CardDescription>
                    Tailor questions to your experience (PDF, DOC, DOCX, max 5MB)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    uploadError ? 'border-red-300 bg-red-50' : 
                    uploadSuccess ? 'border-green-300 bg-green-50' :
                    cvFile ? 'border-purple-300 bg-purple-50' : 'border-gray-300 hover:border-purple-300'
                  }`}>
                    {isUploading ? (
                      <div className="space-y-3">
                        <Loader2 className="mx-auto h-8 w-8 text-purple-600 animate-spin" />
                        <p className="text-sm font-medium text-gray-700">Uploading CV...</p>
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-xs text-gray-600">{uploadProgress}%</p>
                      </div>
                    ) : uploadSuccess ? (
                      <div className="space-y-2">
                        <CheckCircle2 className="mx-auto h-8 w-8 text-green-600" />
                        <p className="text-sm font-medium text-green-700">CV Uploaded Successfully!</p>
                        <p className="text-xs text-green-600">Your CV has been analyzed and saved</p>
                      </div>
                    ) : cvFile ? (
                      <div className="space-y-3">
                        <FileText className="mx-auto h-8 w-8 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 truncate">{cvFile.name}</p>
                          <p className="text-xs text-gray-600">{formatFileSize(cvFile.size)}</p>
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button 
                            onClick={handleFileUpload}
                            disabled={isUploading}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            size="sm"
                          >
                            {isUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <Upload className="w-4 h-4 mr-2" />
                            )}
                            Upload CV
                          </Button>
                          <Button 
                            onClick={removeFile}
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop your CV or click to upload
                        </p>
                        <Input
                          type="file"
                          accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                          className="hidden"
                          id="cv-upload"
                          onChange={handleFileSelect}
                        />
                        <Label htmlFor="cv-upload" className="cursor-pointer">
                          <Button variant="outline" size="sm">
                            Select CV File
                          </Button>
                        </Label>
                        <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX up to 5MB</p>
                      </>
                    )}
                  </div>
                  
                  {uploadError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{uploadError}</p>
                    </div>
                  )}

                  {cvFile && !isUploading && !uploadSuccess && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">{cvFile.name}</p>
                          <p className="text-xs text-gray-600">{formatFileSize(cvFile.size)}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        Ready to upload
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Skill Progress */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Skill Development Progress
                </CardTitle>
                <CardDescription>
                  Track your improvement across key interview areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillAreas.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{skill.score}%</span>
                          <Badge variant={skill.improvement > 0 ? "default" : "secondary"} className="text-xs">
                            +{skill.improvement}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={skill.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Interviews Completed</span>
                  </div>
                  <Badge variant="secondary" className="text-lg font-semibold">
                    {userStats.interviewsCompleted}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Average Score</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-lg font-semibold">
                    {userStats.averageScore}%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Time Practiced</span>
                  </div>
                  <Badge variant="outline" className="text-lg font-semibold">
                    {userStats.timePracticed}
                  </Badge>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Interview Readiness</span>
                    <span>{userStats.readinessScore}%</span>
                  </div>
                  <Progress value={userStats.readinessScore} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Your latest practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm truncate">{session.type}</p>
                          <Badge 
                            variant={session.mode === 'mock' ? "default" : "outline"}
                            className="text-xs"
                          >
                            {session.mode}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          {session.date} • {session.duration}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          session.score >= 80 ? "default" : 
                          session.score >= 70 ? "secondary" : "outline"
                        }
                        className="ml-2 flex-shrink-0"
                      >
                        {session.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-purple-600 hover:text-purple-700">
                  View All History
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-900 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 text-sm">
                  Use the STAR method (Situation, Task, Action, Result) to structure your behavioral answers for maximum impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}