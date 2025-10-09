"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Home, TrendingUp, Star, Target, MessageSquare, Zap, CheckCircle2, Clock } from 'lucide-react';

export default function MockInterviewResults() {
  const router = useRouter();

  const results = {
    overallScore: 8.2,
    readiness: "Ready",
    metrics: {
      communication: 8.5,
      technical: 7.8,
      confidence: 8.0,
      structure: 8.7
    },
    strengths: [
      "Clear and concise communication style",
      "Strong technical knowledge demonstrated",
      "Good eye contact and professional demeanor",
      "Well-structured answers with good examples"
    ],
    improvements: [
      "Include more specific metrics in project descriptions",
      "Practice speaking slightly slower for complex topics",
      "Add more industry trend knowledge for future questions"
    ],
    analysis: {
      fillerWords: 12,
      speakingPace: 145,
      answerLength: "Appropriate",
      bodyLanguage: "Confident"
    },
    sessionInfo: {
      duration: "18:45",
      questions: 5,
      date: "Today"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Interview Complete!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Great job completing your mock interview with Sarah. Here's your detailed performance analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Overall Performance */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Overall Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {results.overallScore}/10
                </div>
                <Badge className="bg-green-100 text-green-800 text-lg border-green-200">
                  {results.readiness}
                </Badge>
              </div>

              <div className="space-y-4">
                {Object.entries(results.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="font-medium capitalize text-gray-700">{key}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={value * 10} className="w-20 h-2" />
                      <span className="font-semibold text-gray-900">{value}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Session Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Session Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-900">{results.sessionInfo.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-900">{results.sessionInfo.questions}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-900">{results.analysis.fillerWords}</div>
                  <div className="text-sm text-gray-600">Filler Words</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-900">{results.analysis.speakingPace} WPM</div>
                  <div className="text-sm text-gray-600">Speaking Pace</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <CheckCircle2 className="w-5 h-5" />
                Key Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Improvements */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Zap className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-800">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                Communication Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Answer Structure</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {results.metrics.structure}/10
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Speaking Clarity</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {results.metrics.communication}/10
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Confidence Level</span>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    {results.metrics.confidence}/10
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Body Language</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {results.analysis.bodyLanguage}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Answer Length</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {results.analysis.answerLength}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Technical Depth</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    {results.metrics.technical}/10
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 pt-8 border-t">
          <Button 
            variant="outline" 
            onClick={() => router.push('/dashboard')}
            className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            onClick={() => router.push('/mock-interview')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
            size="lg"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Practice Again
          </Button>
        </div>

        {/* Progress Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Continue practicing to improve your scores and build confidence for real interviews.
          </p>
        </div>
      </div>
    </div>
  );
}