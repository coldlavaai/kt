import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const correctPassword = process.env.ANALYTICS_PASSWORD || 'coldlava2026'

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true })

      // Set authentication cookie (7 days expiry)
      response.cookies.set('analytics_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function DELETE() {
  // Logout endpoint
  const response = NextResponse.json({ success: true })
  response.cookies.delete('analytics_auth')
  return response
}
