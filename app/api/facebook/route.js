import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  const token = searchParams.get('token');

  if (!pageId || !token) {
    return NextResponse.json({ error: 'Missing pageId or token' }, { status: 400 });
  }

  try {
    // Get page basic info + fan count
    const pageUrl = `https://graph.facebook.com/v19.0/${pageId}?fields=id,name,fan_count,followers_count&access_token=${token}`;
    const pageResp = await fetch(pageUrl);
    const pageData = await pageResp.json();

    // Get insights separately
    const insightsUrl = {"page":{"id":"102907851890377","name":"Thumb Forecast","fan_count":13514,"followers_count":13514},"insights":{"error":{"message":"(#100) The value must be a valid insights metric","type":"OAuthException","code":100,"fbtrace_id":"A0UMb1SEdokyZeVkCvoRBlV"}}}
    const insightsResp = await fetch(insightsUrl);
    const insightsData = await insightsResp.json();

    return NextResponse.json({ page: pageData, insights: insightsData });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
