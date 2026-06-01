import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  const token = searchParams.get('token');

  if (!pageId || !token) {
    return NextResponse.json({ error: 'Missing pageId or token' }, { status: 400 });
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${pageId}/insights?metric=page_impressions_unique,page_impressions,page_fan_adds,page_fans&period=day&access_token=${token}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
