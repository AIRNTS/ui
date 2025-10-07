import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  // Demo authentication
  if (email === "demo@example.com" && password === "demo") {
    return NextResponse.json({ 
      success: true, 
      user: { id: "1", email, name: "Demo User" } 
    });
  }
  
  return NextResponse.json({ success: false, error: "Invalid credentials" 
}, { status: 401 });
}
