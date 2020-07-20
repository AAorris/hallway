import 'core-js/modules/es.promise.all-settled'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'
import AbortController from 'abort-controller'

const Post = styled.div(tw`px-3`)

const Hallway = ({ items }) => (
  <main className={css(tw`bg-black text-white`)}> 
    <section className={css(tw`p-6 prose`)}>
      {items.map(([ts, txt, src]) => {
        return <Post key={ts} style={{border: '1px solid #333'}}>
          <p>
            {src} - 
            &nbsp;<a id={ts} href={`#${ts}`} style={{color: '#888'}}>{ts}</a>
            <br /><span className={css(tw`text-gray-300`)}>{txt}</span></p>
        </Post>
      })}
    </section>
  </main>
)

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

async function aggregateFeeds() {
  const feeds = await require('../feeds').getAllFeeds()
  console.log(feeds)
  const results = await Promise.allSettled(
    feeds.filter(feed => feed.trusted === 'trusted').map(feed => getFeed(feed))
  )
  return results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value)
    .reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => b[0] - a[0])
}

export async function getStaticProps() {
  const items = await aggregateFeeds()
  return { props: { items }, unstable_revalidate: 5 }
}

export default Hallway
