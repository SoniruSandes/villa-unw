import { NextResponse } from 'next/server';

export function middleware(request) {
    const correctPassword = '14&2x';
    const url = request.nextUrl.clone();

    // Check if the user is authenticated
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
