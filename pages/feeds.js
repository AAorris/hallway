import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'
import { useRouter } from 'next/router'
import { css } from '@emotion/css'
import { getAllFeeds } from 'feeds'
import { useEffect, useState } from 'react'

/* styles */
const Post = styled.div(tw`px-3 my-3 border border-gray-200`)
const Prose = styled.div(tw`prose`)
const LightSpan = styled.span(tw`text-gray-600`)
const Form = styled.form(tw`flex flex-col rounded border border-gray-200 p-3 my-3`)
const FormTitle = styled.h2(tw`text-gray-800 pb-3`)
const baseInput = `rounded bg-gray-100 p-1 placeholder-gray-500`
const FormInputInner = styled.input(tw`${baseInput} w-full block`)
const FormInputOuter = styled.div(tw`my-3 mr-3 w-full`)
const FormInput = (props) => <FormInputOuter>
  <label className={css(tw`text-sm mb-3 text-gray-400 block`)} htmlFor={props.name}>{props.name.toUpperCase()}</label>
  <FormInputInner id={props.name} {...props} />
</FormInputOuter>
const FormSubmit = styled.input(tw`
  py-2 my-3 rounded text-gray-600 cursor-pointer
  bg-gray-100 hover:bg-gray-200
  transition-colors duration-200 ease-in-out
  w-12
`)

/* Page */
const Feeds = ({ items }) => {
  const [feed, setFeed] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (router.query.feed) {
      setFeed(router.query.feed)
      router.replace(location.pathname)
    }
  })
  return (
    <main className={css(tw`bg-white text-black lg:flex`)}>
      <section className={css(tw`p-6 flex-grow`)}>
        {feed && <section style={{maxWidth: '65ch'}} className={css(tw`rounded p-6 flex-grow bg-green-500 text-black`)}>
          <p>Submitted {feed}! Please wait for it to appear.</p>
        </section>}
        <Form method="POST" action="/api/domain" style={{maxWidth: '65ch'}}>
          <FormTitle>Register a Feed</FormTitle>
          <p className={css(tw`text-gray-400`)}>
            House rules: Please have less than 500kb of text, and respond in &lt;3s.
            Aggregation features are exclusive to merveilles.town.
            DM @amorris@merveilles.town with any questions.
          </p>
          <section className={css(tw`md:flex`)}>
            <FormInput type="text" name="feed" placeholder="https://alice.com/tw.txt" />
            <FormInput type="text" name="feedname" placeholder="alice.com" />
          </section>
          <FormSubmit type="submit" />
        </Form>
        <Prose>
          {items.map(({url, name, trusted}) => {
            return <Post key={url}>
              <p>{trusted && '✅' || '🟣'} <LightSpan>{name}</LightSpan><br /><a href={url} style={{color: '#888'}}>{url}</a></p>
            </Post>
          })}
        </Prose>
      </section>
    </main>
  )
}

/* For testing */
function getMockFeeds() {
  return {
    "props":{
      "items":[{"url":"https://feed.amorris.ca/hallway.txt","name":"amorris.ca\r"},{"url":"https://t.seed.hex22.org/twtxt.txt","name":"hex22.org\r"},{"url":"https://wiki.xxiivv.com/twtxt.txt","name":"xxiivv.com\r"},{"url":"https://www.gkbrk.com/twtxt.txt","name":"gkbrk.com\r"},{"url":"https://phse.net/twtxt/merv.txt","name":"phse.net\r"},{"url":"https://avanier.now.sh/tw.txt","name":"avanier.now.sh"}]
    }
  }
}

export async function getStaticProps() {
  const items = await getAllFeeds()
  // return getMockFeeds()
  return { props: { items }, unstable_revalidate: 5 }
}

export default Feeds
