"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Video, Square, Play, RotateCcw, Home, Star, Zap, Target, MessageSquare } from 'lucide-react';

export default function PracticePage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced questions data with categories
  const questions = [
    {
      id: 1,
      text: "Tell me about yourself and your background.",
      category: "Introduction",
      tips: ["Focus on professional journey", "Connect to target role", "Keep it under 2 minutes"]
    },
    {
      id: 2,
      text: "What are your greatest strengths and how do they apply to this role?",
      category: "Strengths",
      tips: ["Provide specific examples", "Align with job requirements", "Show impact with metrics"]
    },
    {
      id: 3,
      text: "Describe a challenging situation you faced at work and how you handled it.",
      category: "Behavioral",
      tips: ["Use STAR method", "Focus on your actions", "Show what you learned"]
    },
    {
      id: 4,
      text: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      tips: ["Align with company growth", "Show ambition but be realistic", "Connect to skill development"]
    },
    {
      id: 5,
      text: "Why do you want to work at our company specifically?",
      category: "Motivation",
      tips: ["Research the company", "Connect to personal values", "Show genuine interest"]
    }
  ];

  // Mock feedback data - will be replaced with AI analysis
  const mockFeedback = {
    clarity: 8.2,
    confidence: 7.5,
    structure: 8.8,
    relevance: 9.1,
    overall: 8.4,
    strengths: [
      "Excellent use of STAR method",
      "Clear and concise communication",
      "Good eye contact maintained"
    ],
    improvements: [
      "Speak slightly slower for better clarity",
      "Include more specific metrics in examples",
      "Reduce filler words ('um', 'like')"
    ]
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        setSessionTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Stop all tracks
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }

      // Show feedback after a brief delay
      setTimeout(() => setShowFeedback(true), 1000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSessionTime(0);
      setIsRecording(false);
      setShowFeedback(false);
      setUserNotes("");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSessionTime(0);
      setIsRecording(false);
      setShowFeedback(false);
      setUserNotes("");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Practice Mode
            </h1>
            <p className="text-gray-600 mt-2">
              Get instant AI-powered feedback after each answer
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Question & Recording */}
          <div className="space-y-6">
            {/* Question Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      Question {currentQuestion + 1} of {questions.length}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {currentQuestionData.category}
                      </Badge>
                      <span>Practice with instant feedback</span>
                    </CardDescription>
                  </div>
                  <Badge variant={isRecording ? "destructive" : "secondary"} className="flex items-center gap-1">
                    {isRecording ? (
                      <>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Recording
                      </>
                    ) : (
                      "Ready"
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Text */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100">
                  <p className="text-lg font-medium text-gray-900 leading-relaxed">
                    {currentQuestionData.text}
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-amber-800">Pro Tips</span>
                  </div>
                  <ul className="space-y-1 text-sm text-amber-700">
                    {currentQuestionData.tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-amber-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timer & Controls */}
                <div className="space-y-4">
                  <div className="text-center py-4 bg-gray-50 rounded-lg border">
                    <div className="text-2xl font-mono font-bold text-gray-900">
                      {formatTime(sessionTime)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Recording Time
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {!isRecording ? (
                      <Button
                        onClick={handleStartRecording}
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button
                        onClick={handleStopRecording}
                        variant="destructive"
                        size="lg"
                        className="flex-1"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Stop & Analyze
                      </Button>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handlePreviousQuestion}
                      variant="outline"
                      disabled={currentQuestion === 0 || isRecording}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      variant="outline"
                      disabled={currentQuestion === questions.length - 1 || isRecording}
                      className="flex-1"
                    >
                      Next Question
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Session Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Completed {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Video & Feedback */}
          <div className="space-y-6">
            {/* Video Preview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  Camera Preview
                </CardTitle>
                <CardDescription>
                  {isRecording ? "Recording in progress..." : "Camera feed will appear here"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className={`w-full h-full object-cover ${isRecording ? 'block' : 'hidden'}`}
                  />
                  {!isRecording && (
                    <div className="absolute text-white text-center p-6">
                      <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Camera Preview</p>
                      <p className="text-sm opacity-75 mt-1">Start recording to begin practice session</p>
                    </div>
                  )}
                  {isRecording && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        REC
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Instant Feedback */}
            {showFeedback && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <Target className="w-5 h-5" />
                    Instant Feedback
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    AI analysis of your recent answer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-green-600">{mockFeedback.overall}/10</div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-lg font-bold text-gray-900">{formatTime(sessionTime)}</div>
                      <div className="text-sm text-gray-600">Answer Length</div>
                    </div>
                  </div>

                  {/* Detailed Scores */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Clarity</span>
                      <span className="font-semibold">{mockFeedback.clarity}/10</span>
                    </div>
                    <Progress value={mockFeedback.clarity * 10} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Confidence</span>
                      <span className="font-semibold">{mockFeedback.confidence}/10</span>
                    </div>
                    <Progress value={mockFeedback.confidence * 10} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Structure</span>
                      <span className="font-semibold">{mockFeedback.structure}/10</span>
                    </div>
                    <Progress value={mockFeedback.structure * 10} className="h-2" />
                  </div>

                  {/* Feedback Points */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-1 text-sm text-green-700">
                        {mockFeedback.strengths.map((strength, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Areas to Improve
                      </h4>
                      <ul className="space-y-1 text-sm text-amber-700">
                        {mockFeedback.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* User Notes */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your Notes</h4>
                    <Textarea
                      placeholder="Add your own notes about this answer..."
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Question Navigation */}
            {!showFeedback && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Question Bank</CardTitle>
                  <CardDescription>Jump to specific questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {questions.map((question, index) => (
                      <Button
                        key={question.id}
                        variant={currentQuestion === index ? "default" : "outline"}
                        className="w-full justify-start h-auto py-3 text-left"
                        onClick={() => {
                          setCurrentQuestion(index);
                          setSessionTime(0);
                          setIsRecording(false);
                          setShowFeedback(false);
                        }}
                        disabled={isRecording}
                      >
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="flex-shrink-0 mt-0.5">
                            {index + 1}
                          </Badge>
                          <div className="text-left">
                            <div className="font-medium text-sm">Q{index + 1}: {question.text.substring(0, 40)}...</div>
                            <div className="text-xs text-muted-foreground mt-1">{question.category}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
