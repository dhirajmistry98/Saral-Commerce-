import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // For testing purposes - hardcoded admin credentials
    // Using the credentials you're trying: admin@fmail.com and 12345678
    if (email === "admin@fmail.com" && password === "12345678") {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Admin login successful',
          user: { email, role: 'admin' }
        },
        { status: 200 }
      );
    }

    // If credentials don't match
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid credentials'
      },
      { status: 401 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
