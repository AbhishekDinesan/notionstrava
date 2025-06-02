import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = encodeURIComponent('http://localhost:3000/api/oauth/callback'); 
  const url = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=read,activity:read_all`;
  return NextResponse.redirect(url, 302);
}
