import { getAllFeeds } from 'feeds'
import AbortController from 'abort-controller'


function ago(val) {
  val = 0 | (Date.now() - val) / 1000;
  var unit, length = { second: 60, minute: 60, hour: 24, day: 7, week: 4.35,
      month: 12, year: 10000 }, result;

  for (unit in length) {
      result = val % length[unit];
      if (!(val = 0 | val / length[unit]))
          return result + ' ' + (result-1 ? unit + 's' : unit);
  }
}

async function getFeed(feed) {
  const {signal, abort} = new AbortController()
  setTimeout(() => {
    try {
      abort()
    } catch (e) {}
  }, 3000)
  const resp = await fetch(feed.url, {
    signal,
    size: 1000 * 1000, // 1000kb in bytes
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
  const text = await resp.text()
  const lines = text.trim().split('\n').filter(l => l[0] !== '#')
  const pairs = lines.map(line => line.split('\t'))
  let x = 0
  const items = pairs.map(([ts, txt]) => {
    const dt = new Date(ts)
    if (!dt || !txt) return null
    try {
      return [dt.getTime(), txt, feed.name || feed.url]
    } catch (e) { return null }
  }).filter(x => x)
  return items
}

async function aggregateFeeds(n = 10) {
  const feeds = await getAllFeeds()
  const results = await Promise.allSettled(
    feeds.filter(feed => feed.trusted === 'trusted').map(feed => getFeed(feed))
  )
  return results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value)
    .reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => b[0] - a[0])
    .map(([ts, txt, src]) => `${src}\t${ago(ts)} ago\t${txt}`)
    .slice(0, n)
}

export default async function getHead(req, res) {
  try {
    const data = await aggregateFeeds(Math.min(500, req.query.n || 10))
    res.writeHead(200, 'OK', {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'max-age=3, s-maxage=1, stale-while-revalidate',
    })
    res.end(data.join('\n'))
  } catch(e) {
    res.writeHead(500)
    res.end(e.message)
  }
}