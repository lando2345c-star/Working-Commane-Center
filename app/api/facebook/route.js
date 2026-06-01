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
    pageUrl.searchParams.set('fields', 'id,name,fan_count');
    pageUrl.searchParams.set('access_token', token);

    const pageResp = await fetch(pageUrl.toString());
    const pageData = await pageResp.json();

    const insightsUrl = new URL(`https://graph.facebook.com/v19.0/${pageId}/insights`);
    insightsUrl.searchParams.set('metric', 'page_views_total,page_fan_adds_unique');
    insightsUrl.searchParams.set('period', 'day');
    insightsUrl.searchParams.set('access_token', token);

    const insightsResp = await fetch(insightsUrl.toString());
    const insightsData = await insightsResp.json();

    return NextResponse.json({ page: pageData, insights: insightsData });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
