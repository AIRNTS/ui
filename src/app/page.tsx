"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 
"@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (user) {
    // User is logged in - show practice options
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back!</CardTitle>
            <CardDescription>
              Ready to practice your interview skills?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Continue your interview practice journey.</p>
              <div className="flex gap-4">
                <Link href="/practice">
                  <Button>Start Practice Session</Button>
                </Link>
                <Link href="/mock-interview">
                  <Button variant="outline">Try Mock Interview</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is not logged in - show sign in options
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Interview Coach AI</CardTitle>
          <CardDescription>
            Practice and improve your interview skills with AI feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Welcome to your interview coaching app! Sign in to get 
started.</p>
            <div className="flex gap-4">
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
