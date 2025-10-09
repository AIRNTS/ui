"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Edit3,
  Save,
  Camera,
  Bell,
  Shield,
  Download,
  Upload
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data - replace with actual user data from context/API
  const userData = {
    personalInfo: {
      fullName: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      bio: "Computer Science graduate with 2 years of experience in full-stack development. Passionate about building scalable applications and continuous learning.",
      avatar: "/avatars/alex.jpg"
    },
    education: {
      degree: "Bachelor of Science in Computer Science",
      university: "Stanford University",
      graduationYear: "2023",
      gpa: "3.8"
    },
    professional: {
      currentRole: "Software Engineer",
      experience: "2 years",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      targetRoles: ["Senior Software Engineer", "Full Stack Developer", "Tech Lead"]
    },
    stats: {
      interviewsCompleted: 24,
      averageScore: 82,
      readinessScore: 78,
      timePracticed: "18h 45m",
      joinedDate: "January 2024"
    },
    preferences: {
      emailNotifications: true,
      practiceReminders: true,
      feedbackEmails: true,
      darkMode: false
    }
  };

  const [formData, setFormData] = useState(userData);

  const handleSaveProfile = () => {
    // TODO: Save to backend API
    console.log('Saving profile:', formData);
    setIsEditing(false);
    // Show success message
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const skillAreas = [
    { name: 'Technical Communication', score: 85, target: 90 },
    { name: 'Behavioral Interviews', score: 78, target: 85 },
    { name: 'System Design', score: 82, target: 88 },
    { name: 'Problem Solving', score: 88, target: 92 },
    { name: 'Leadership Stories', score: 72, target: 80 }
  ];

  const recentAchievements = [
    { id: 1, title: "Completed 10 Mock Interviews", date: "2024-01-15", type: "milestone" },
    { id: 2, title: "Reached 80% Average Score", date: "2024-01-12", type: "performance" },
    { id: 3, title: "Mastered STAR Method", date: "2024-01-10", type: "skill" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Profile & Settings
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your personal information, preferences, and track your progress
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/dashboard')}
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Card */}
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-4 right-0 w-6 h-6 rounded-full"
                  >
                    <Camera className="w-3 h-3" />
                  </Button>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900">{formData.personalInfo.fullName}</h3>
                <p className="text-sm text-gray-600">{formData.professional.currentRole}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">{formData.stats.joinedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Interviews</span>
                    <Badge variant="secondary">{formData.stats.interviewsCompleted}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Readiness Score</span>
                    <span className="font-semibold">{formData.stats.readinessScore}%</span>
                  </div>
                  <Progress value={formData.stats.readinessScore} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average Score</span>
                    <span className="font-semibold">{formData.stats.averageScore}%</span>
                  </div>
                  <Progress value={formData.stats.averageScore} className="h-2" />
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Time Practiced</span>
                    <span className="font-medium">{formData.stats.timePracticed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Import CV
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100/50 p-1 rounded-lg">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and professional information
                      </CardDescription>
                    </div>
                    <Button 
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "default" : "outline"}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      {isEditing ? (
                        <Save className="w-4 h-4 mr-2" />
                      ) : (
                        <Edit3 className="w-4 h-4 mr-2" />
                      )}
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.personalInfo.fullName}
                          onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                          disabled={!isEditing}
                          className="disabled:opacity-75"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.personalInfo.email}
                          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                          disabled={!isEditing}
                          className="disabled:opacity-75"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.personalInfo.phone}
                          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                          disabled={!isEditing}
                          className="disabled:opacity-75"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.personalInfo.location}
                          onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                          disabled={!isEditing}
                          className="disabled:opacity-75"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.personalInfo.bio}
                        onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
                        disabled={!isEditing}
                        className="min-h-[100px] resize-none disabled:opacity-75"
                        placeholder="Tell us about your professional background and career goals..."
                      />
                    </div>

                    {/* Education & Professional */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-600" />
                          <h4 className="font-semibold">Education</h4>
                        </div>
                        <div className="space-y-3">
                          <Input
                            placeholder="Degree"
                            value={formData.education.degree}
                            onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                            disabled={!isEditing}
                            className="disabled:opacity-75"
                          />
                          <Input
                            placeholder="University"
                            value={formData.education.university}
                            onChange={(e) => handleInputChange('education', 'university', e.target.value)}
                            disabled={!isEditing}
                            className="disabled:opacity-75"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              placeholder="Graduation Year"
                              value={formData.education.graduationYear}
                              onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value)}
                              disabled={!isEditing}
                              className="disabled:opacity-75"
                            />
                            <Input
                              placeholder="GPA"
                              value={formData.education.gpa}
                              onChange={(e) => handleInputChange('education', 'gpa', e.target.value)}
                              disabled={!isEditing}
                              className="disabled:opacity-75"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-purple-600" />
                          <h4 className="font-semibold">Professional</h4>
                        </div>
                        <div className="space-y-3">
                          <Input
                            placeholder="Current Role"
                            value={formData.professional.currentRole}
                            onChange={(e) => handleInputChange('professional', 'currentRole', e.target.value)}
                            disabled={!isEditing}
                            className="disabled:opacity-75"
                          />
                          <Input
                            placeholder="Experience"
                            value={formData.professional.experience}
                            onChange={(e) => handleInputChange('professional', 'experience', e.target.value)}
                            disabled={!isEditing}
                            className="disabled:opacity-75"
                          />
                          <div>
                            <Label className="text-sm">Target Roles</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {formData.professional.targetRoles.map((role, index) => (
                                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Skill Development Progress</CardTitle>
                    <CardDescription>
                      Track your improvement across key interview competency areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {skillAreas.map((skill, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{skill.score}%</span>
                              <Badge variant="outline" className="text-xs">
                                Target: {skill.target}%
                              </Badge>
                            </div>
                          </div>
                          <Progress value={skill.score} className="h-3" />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Current level</span>
                            <span>{skill.score >= skill.target ? "🎯 Target achieved!" : `${skill.target - skill.score}% to target`}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                    <CardDescription>
                      Your self-reported technical skills and proficiency levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {formData.professional.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1.5 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="mt-4">
                        <Input 
                          placeholder="Add a new skill and press Enter"
                          className="max-w-md"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              if (input.value.trim()) {
                                // Add new skill logic here
                                input.value = '';
                              }
                            }
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>
                      Milestones and accomplishments in your interview preparation journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAchievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {achievement.date}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              achievement.type === 'milestone' ? 'default' : 
                              achievement.type === 'performance' ? 'secondary' : 'outline'
                            }
                          >
                            {achievement.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
                  <CardHeader>
                    <CardTitle>Next Goals</CardTitle>
                    <CardDescription>
                      Your upcoming targets and objectives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <span>Complete 5 more mock interviews</span>
                        <Badge variant="outline">2/5 completed</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <span>Reach 85% average score</span>
                        <Badge variant="outline">82% current</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <span>Practice all question categories</span>
                        <Badge variant="outline">3/5 categories</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates about your progress</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {formData.preferences.emailNotifications ? "Disable" : "Enable"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="font-medium">Practice Reminders</p>
                          <p className="text-sm text-gray-600">Get reminded to practice regularly</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {formData.preferences.practiceReminders ? "Disable" : "Enable"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="font-medium">Feedback Reports</p>
                          <p className="text-sm text-gray-600">Receive detailed feedback emails</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {formData.preferences.feedbackEmails ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Personal Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}