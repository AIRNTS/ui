"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Mic, BarChart3, MessageSquare } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect to dashboard
    // Later: Connect to actual authentication
    router.push('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Marketing Content */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-purple-600 to-blue-600 text-white p-12">
        <div className="max-w-md mx-auto flex flex-col justify-center">
          {/* Hero Text */}
          <div className="space-y-6 mb-12">
            <h2 className="text-4xl font-bold leading-tight">
              ACE YOUR JOB INTERVIEW WITH AI
            </h2>
            <p className="text-xl text-purple-100 leading-relaxed">
              Practice with realistic AI interviews and get instant feedback on your communication, confidence, and content.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Real-time AI Conversation</h3>
                <p className="text-purple-200 text-sm">Dynamic interviews that adapt to your answers</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Voice & Video Analysis</h3>
                <p className="text-purple-200 text-sm">Get feedback on body language and speech</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Personalized Feedback</h3>
                <p className="text-purple-200 text-sm">Detailed reports with actionable insights</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Progress Tracking</h3>
                <p className="text-purple-200 text-sm">Monitor your improvement over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign-up Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Create a New Account</h2>
            </div>

            {/* Sign-up Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Sign Up
              </Button>
            </form>

            {/* Login Link - FIXED to point to /auth/signin */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/auth/signin" 
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Log in
                </Link>
              </p>
            </div>

            {/* Mobile-only link to login - FIXED to point to /auth/signin */}
            <div className="lg:hidden text-center mt-6 pt-6 border-t">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/auth/signin" 
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Log in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}