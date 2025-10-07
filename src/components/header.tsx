"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between 
items-center">
        <Link href="/" className="text-xl font-bold">
          Interview Coach AI
        </Link>
        
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/practice" className="hover:text-primary 
transition-colors">
                Practice
              </Link>
              <Link href="/dashboard" className="hover:text-primary 
transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" onClick={handleSignOut} size="sm">
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
