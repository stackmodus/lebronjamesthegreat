// Cloudflare Pages Function — proxies NBA live data (CORS-safe)
const NBA_CDN = 'https://cdn.nba.com/static/json/liveData';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const type = url.searchParams.get('type');
  const gameId = url.searchParams.get('gameId');

  let target;
  if (type === 'scoreboard') {
    target = `${NBA_CDN}/scoreboard/todaysScoreboard_00.json`;
  } else if (type === 'boxscore' && gameId) {
    target = `${NBA_CDN}/boxscore/boxscore_${gameId}.json`;
  } else if (type === 'schedule') {
    target = 'https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json';
  } else {
    return new Response(JSON.stringify({ error: 'Invalid request. Use ?type=scoreboard, ?type=schedule, or ?type=boxscore&gameId=XXXX' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const cacheTtl = type === 'schedule' ? 3600 : 20;
    const resp = await fetch(target, {
      headers: { 'Accept': 'application/json' },
      cf: { cacheTtl }
    });

    if (!resp.ok) {
      return new Response(JSON.stringify({ error: 'NBA API returned ' + resp.status }), {
        status: resp.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const data = await resp.text();
    return new Response(data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': `public, max-age=${type === 'schedule' ? 3600 : 20}`
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Fetch failed: ' + err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
