"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 
"@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PracticePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock questions data - will be replaced with real data from backend
  const questions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths?",
    "Describe a challenging situation you faced at work and how you handled it.",
    "Where do you see yourself in 5 years?",
    "Why do you want to work at our company?"
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Timer simulation - will be replaced with real timer
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setSessionTime(0);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => (prev + 1) % questions.length);
    setSessionTime(0);
    setIsRecording(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, 
'0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Practice Mode</h1>
        <p className="text-muted-foreground">Practice answering common 
interview questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Question & Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Current Question</CardTitle>
                  <CardDescription>
                    Question {currentQuestion + 1} of {questions.length}
                  </CardDescription>
                </div>
                <Badge variant={isRecording ? "destructive" : 
"secondary"}>
                  {isRecording ? "Recording" : "Ready"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  {questions[currentQuestion]}
                </p>
                
                {/* Timer */}
                <div className="text-center py-4">
                  <div className="text-2xl font-mono font-bold">
                    {formatTime(sessionTime)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Session Time
                  </div>
                </div>

                {/* Recording Controls */}
                <div className="flex gap-4 justify-center">
                  {!isRecording ? (
                    <Button 
                      onClick={handleStartRecording}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Start Recording
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleStopRecording}
                      variant="destructive"
                      size="lg"
                    >
                      Stop Recording
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleNextQuestion}
                    variant="outline"
                    disabled={isRecording}
                  >
                    Next Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Navigation */}
          <Card>
            <CardHeader>
              <CardTitle>Question Bank</CardTitle>
              <CardDescription>Select a specific question to 
practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {questions.map((question, index) => (
                  <Button
                    key={index}
                    variant={currentQuestion === index ? "default" : 
"outline"}
                    className="w-full justify-start h-auto py-3"
                    onClick={() => {
                      setCurrentQuestion(index);
                      setSessionTime(0);
                      setIsRecording(false);
                    }}
                    disabled={isRecording}
                  >
                    <span className="text-left">
                      <span className="font-medium">Q{index + 1}:</span>{" "}
                      {question.substring(0, 60)}...
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Video & Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Preview</CardTitle>
              <CardDescription>Your camera feed will appear 
here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex 
items-center justify-center border-2 border-dashed 
border-muted-foreground/25">
                {isRecording ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full 
animate-pulse mx-auto mb-4"></div>
                    <p className="font-medium">Recording in 
progress...</p>
                    <p className="text-sm text-muted-foreground">Video 
will be analyzed for feedback</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted-foreground/25 
rounded-full mx-auto mb-4"></div>
                    <p className="font-medium">Camera Preview</p>
                    <p className="text-sm text-muted-foreground">Start 
recording to begin</p>
                  </div>
                )}
              </div>
              
              {/* Mock video element - will be replaced with real 
MediaRecorder */}
              <video 
                ref={videoRef} 
                className="hidden" 
                playsInline 
                autoPlay 
                muted 
              />
            </CardContent>
          </Card>

          {/* Session Info */}
          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Questions Practiced:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Practice Time:</span>
                  <span className="font-medium">45 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Score:</span>
                  <span className="font-medium">8.2/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Practice:</span>
                  <span className="font-medium">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
