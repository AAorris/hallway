// POST /api/domain

const WEBHOOK = process.env.HOOK_URL

export default async function domainEndpoint(req, res) {
  const params_ = new URLSearchParams()
  params_.append('feed', req.body.feed)
  params_.append('feedname', req.body.feedname)
  if (!req.body.feed || !req.body.feedname || !req.body.feed.startsWith('https://')) {
    res.writeHead(400)
    res.end('Must provide feed, feedname, and feed must be https')
    return
  }
  const resp = await fetch(WEBHOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      feed: req.body.feed,
      feedname: req.body.feedname,
    })
  })
  if (!resp.ok) {
    res.writeHead(500)
    res.end(resp.statusText)
    return
  }
  res.writeHead(301, {Location: `/feeds?${params_.toString()}`, 'Content-Type': 'text/plain'})
  res.end('Submitted - Sending you back where you came from.')
}