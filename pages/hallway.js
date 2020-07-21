import 'core-js/modules/es.promise.all-settled'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'
import AbortController from 'abort-controller'

const Post = styled.div(tw`flex flex-col md:flex-row mb-6`)

  
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

const Hallway = ({ items }) => (
  <main className={css(tw`bg-white text-black`)}> 
    <section className={css(tw`p-6`)}>
      {items.map(([ts, txt, src]) => {
        return <Post key={ts}>
          <p className={css(tw`pr-3 md:w-1/6 text-gray-500 font-bold`)}>{src}</p>
          <p className={css(tw`md:w-4/6 text-gray-500`)} style={{maxWidth: '64ch'}}>{txt}</p>
          <p className={css(tw`md:w-1/6 text-gray-500 text-right flex-grow`)}><a id={ts} href={`#${ts}`} style={{color: '#888'}}>{ago(ts)} ago</a></p>
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
