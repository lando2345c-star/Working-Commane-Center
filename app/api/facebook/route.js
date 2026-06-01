import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const token = searchParams.get('token');

    if (!pageId || !token) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }

    const pageResp = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}?fields=id,name,fan_count&access_token=${token}`
    );
    const pageData = await pageResp.json();

    const insightsResp = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/insights?metric=page_views_total,page_fan_adds_unique&period=day&access_token=${token}`
    );
    const insightsData = await insightsResp.json();

    return NextResponse.json({ page: pageData, insights: insightsData });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
