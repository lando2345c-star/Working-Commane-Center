import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pageId = url.searchParams.get('pageId');
    const token = url.searchParams.get('token');

    if (!pageId || !token) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }

    const pageUrl = new URL(`https://graph.facebook.com/v19.0/${pageId}`);
    pageUrl.searchParams.set('fields', 'id,name,fan_count,followers_count,talking_about_count,posts.limit(5){created_time,message,full_picture}');
    pageUrl.searchParams.set('access_token', token);

    const pageResp = await fetch(pageUrl.toString());
    const pageData = await pageResp.json();

    return NextResponse.json(pageData);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
