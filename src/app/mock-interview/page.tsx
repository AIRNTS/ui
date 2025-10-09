"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Video, Mic, CheckCircle2, XCircle, Play, Wifi, Lightbulb, User } from 'lucide-react';

export default function MockInterviewLobby() {
  const router = useRouter();
  const [equipmentStatus, setEquipmentStatus] = useState({
    camera: false,
    microphone: false,
    internet: true
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const checkEquipment = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setEquipmentStatus(prev => ({ ...prev, camera: true, microphone: true }));
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Don't stop the stream immediately so we can show the camera feed
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
      }, 5000);
      
    } catch (error) {
      setEquipmentStatus(prev => ({ ...prev, camera: false, microphone: false }));
    }
  };

  const startInterview = () => {
    router.push('/mock-interview/room');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        
        {/* Header Section - Inspired by the screenshot */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Assessment with our AI, Sarah
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sarah will conduct an AI-powered interview to capture your unique skills and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Camera Check & Connection */}
          <div className="space-y-6">
            
            {/* Camera Check Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Video className="w-5 h-5 text-purple-600" />
                  Check your camera
                </CardTitle>
                <CardDescription>
                  Please ensure you are in a well lit room and that your face is clearly visible in the center of the frame.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!equipmentStatus.camera && (
                    <div className="absolute text-white text-center">
                      <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Camera preview will appear here</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={checkEquipment} 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  Test Camera & Microphone
                </Button>

                {/* Equipment Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Video className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Camera</span>
                    </div>
                    {equipmentStatus.camera ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Mic className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Microphone</span>
                    </div>
                    {equipmentStatus.microphone ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connection Test Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wifi className="w-5 h-5 text-purple-600" />
                  Connection Test
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Your internet connection is looking good.</p>
                      <p className="text-sm text-green-700">Ready for a smooth interview experience</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Interview Info & Tips */}
          <div className="space-y-6">
            
            {/* Ready to Interview Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 border-purple-100">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Ready to interview with Sarah?
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="text-left space-y-3">
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-purple-600" />
                        Tips for the interview:
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Quiet room with no background noise</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Good lighting conditions to see your face</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">AI use or outside assistance will affect feedback accuracy</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={startInterview}
                        disabled={!equipmentStatus.camera || !equipmentStatus.microphone}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        size="lg"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Interview with Sarah
                      </Button>
                      
                      {(!equipmentStatus.camera || !equipmentStatus.microphone) && (
                        <p className="text-sm text-red-600 mt-2">
                          Please test your camera and microphone first
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-purple-600" />
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Feedback</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Comprehensive</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Analysis</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Multi-modal</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Results</span>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">Instant</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Setup Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={
                    (equipmentStatus.camera ? 33 : 0) + 
                    (equipmentStatus.microphone ? 33 : 0) + 
                    (equipmentStatus.internet ? 34 : 0)
                  } 
                  className="h-2" 
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Equipment Check</span>
                  <span>
                    {(
                      (equipmentStatus.camera ? 33 : 0) + 
                      (equipmentStatus.microphone ? 33 : 0) + 
                      (equipmentStatus.internet ? 34 : 0)
                    )}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}