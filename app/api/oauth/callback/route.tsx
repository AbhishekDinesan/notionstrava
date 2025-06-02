import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const scope = searchParams.get('scope'); // hey, don't forget to validate me!
  const activity = searchParams.get('activity');
  if (error) {
    return NextResponse.json({ error: `Strava returned an error: ${error}` }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: 'Authorization code not found.' }, { status: 400 });
  } 
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const tokenRes = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) {
    const err = await tokenRes.json();
    console.error("Token exchange error:", err);
    return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
  }
  const tokenData = await tokenRes.json();
  console.log(tokenData)
  const refresh_token = tokenData.refresh_token
  const access_token = tokenData.access_token
  return NextResponse.json({ "refresh": refresh_token, 
                            "access": access_token
                             });
}
