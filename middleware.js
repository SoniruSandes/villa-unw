// middleware.js (or middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/protected-route', // Protect only specific routes
};

export function middleware(request: NextRequest) {
  const correctPassword = 'your_secure_password';
  const auth = request.headers.get('authorization');

  if (!auth || !auth.startsWith('Basic ')) {
    // Prompt for password
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  // Decode the credentials
  const credentials = Buffer.from(auth.split(' ')[1], 'base64').toString();
  const [username, password] = credentials.split(':');

  if (password !== correctPassword) {
    // Incorrect password
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  // Allow access
  return NextResponse.next();
}
