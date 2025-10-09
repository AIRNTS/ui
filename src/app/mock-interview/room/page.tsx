"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Square, Video, MessageSquare, Clock } from 'lucide-react';

export default function MockInterviewRoom() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [interviewTime, setInterviewTime] = useState(0);
  const [isAiSpeaking, setIsAiSpeaking] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startInterview();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        setInterviewTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      // Simulate AI speaking for 3 seconds
      setTimeout(() => {
        setIsAiSpeaking(false);
      }, 3000);

    } catch (error) {
      console.error('Error starting interview:', error);
    }
  };

  const finishInterview = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }

      router.push('/mock-interview/results');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      {/* Header */}
      <div className="border-b border-purple-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Mock Interview</h1>
                <p className="text-sm text-purple-300">AI-Powered Assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-mono font-bold">{formatTime(interviewTime)}</div>
                <div className="text-xs text-purple-300">Session Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Left Column - AI Interviewer */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-purple-800/50 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {/* AI Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    {isAiSpeaking && (
                      <div className="absolute -top-1 -right-1">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-1">Sarah</h3>
                    <p className="text-purple-300 text-sm">AI Interviewer</p>
                  </div>

                  {/* AI Status */}
                  <div className="space-y-3">
                    {isAiSpeaking ? (
                      <div className="bg-purple-700/50 rounded-lg p-3 border border-purple-600/50">
                        <div className="flex items-center gap-2 text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Sarah is speaking</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-700/50 rounded-lg p-3 border border-blue-600/50">
                        <div className="flex items-center gap-2 text-blue-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Ready for your answer</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card className="bg-purple-800/50 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button 
                    onClick={finishInterview}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    size="lg"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    End Interview
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-700/50">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-700/50">
                      <Mic className="w-4 h-4 mr-2" />
                      Audio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Video Feed */}
          <div className="lg:col-span-2">
            <Card className="bg-purple-800/50 border-purple-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-6 h-full">
                <div className="aspect-video bg-black rounded-xl relative overflow-hidden border-2 border-purple-600/50">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Recording Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      REC
                    </div>
                  </div>

                  {/* Timer Overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-mono">
                      {formatTime(interviewTime)}
                    </div>
                  </div>
                </div>

                {/* Response Indicator */}
                {!isAiSpeaking && (
                  <div className="mt-4 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg p-4 border border-purple-500/50">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-green-400">Ready for your response</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-6 bg-purple-800/30 rounded-full px-6 py-3 border border-purple-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-300">Connection Stable</span>
            </div>
            <div className="w-px h-4 bg-purple-600/50"></div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-green-500" />
              <span className="text-sm text-purple-300">Camera Active</span>
            </div>
            <div className="w-px h-4 bg-purple-600/50"></div>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-green-500" />
              <span className="text-sm text-purple-300">Microphone Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}