import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'

const SelectedNavItem = styled.a(tw`
  pb-4 pt-5 ml-3
  border-solid border-0 border-b-2 border-white
`)

const NavItem = styled.a(tw`
  pb-4 pt-5 ml-3 text-gray-500
`)

const Post = styled.div(tw`
  px-3
`)

const Hallway = ({ items }) => (
  <main className={css(tw`bg-black text-white`)}>
    <nav className={css(tw`pl-3 flex flex-row border-solid border-0 border-b border-gray-700`)}>
      <SelectedNavItem>Hallway</SelectedNavItem>
    </nav>
    <section className={css(tw`p-6 prose`)}>
      {items.map(([ts, txt, src]) => {
        return <Post key={ts} style={{border: '1px solid #333'}}>
          <p>{src} - {ts}<br /><span className={css(tw`text-gray-300`)}>{txt}</span></p>
        </Post>
      })}
    </section>
  </main>
)

async function getFeed(url) {
  const resp = await fetch(url)
  const text = await resp.text()
  const lines = text.trim().split('\n')
  const pairs = lines.map(line => line.split('\t'))
  let x = 0
  const items = pairs.map(([ts, txt]) => {
    const dt = new Date(ts)
    if (!dt || !txt) return null
    try {
      return [dt.getTime(), txt, url]
    } catch (e) { return null }
  }).filter(x => x)
  return items
}

export async function getStaticProps() {
  const urls = require('../feeds').urls
  const results = await Promise.all(urls.map(getFeed))
  const items = results
    .reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => b[0] - a[0])
  // console.log(items)
  return { props: { items }, unstable_revalidate: 5 }
}

export default Hallway
