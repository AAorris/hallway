import { useRouter } from 'next/router'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'
import { getAllFeeds } from 'feeds'
import { useEffect, useState } from 'react'

/* styles */
const Post = styled.div(tw`px-3 my-3 border border-gray-600`)
const Prose = styled.div(tw`prose`)
const LightSpan = styled.span(tw`text-gray-300`)
const Form = styled.form(tw`flex flex-col rounded border border-gray-600 p-3 my-3`)
const FormTitle = styled.h2(tw`text-gray-200`)
const baseInput = `rounded bg-gray-900 p-1 placeholder-gray-500`
const FormInputInner = styled.input(tw`${baseInput} w-full block`)
const FormInputOuter = styled.div(tw`my-3 mx-1 w-full`)
const FormInput = (props) => <FormInputOuter>
  <label className={css(tw`text-sm mb-3 text-gray-400 block`)} htmlFor={props.name}>{props.name.toUpperCase()}</label>
  <FormInputInner id={props.name} {...props} />
</FormInputOuter>
const FormSubmit = styled.input(tw`
  py-2 mx-1 my-3 rounded text-gray-600 cursor-pointer
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
    <main className={css(tw`bg-black text-white lg:flex`)}>
      <section className={css(tw`p-6 flex-grow`)}>
        {feed && <section style={{maxWidth: '65ch'}} className={css(tw`rounded p-6 flex-grow bg-green-500 text-white`)}>
          <p>Submitted {feed}! Please wait for it to appear.</p>
        </section>}
        <Form method="POST" action="/api/domain" style={{maxWidth: '65ch'}}>
          <FormTitle>Submit a Feed</FormTitle>
          <section className={css(tw`md:flex`)}>
            <FormInput type="text" name="feed" placeholder="https://alice.com/tw.txt" />
            <FormInput type="text" name="feedname" placeholder="alice.com" />
          </section>
          <FormSubmit type="submit" />
        </Form>
        <Prose>
          {items.map(({url, name}) => {
            return <Post key={url}>
              <p><LightSpan>{name}</LightSpan><br />{url}</p>
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
