import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'


const About = ({ items }) => (
  <main className={css(tw`bg-black text-gray-300 text-lg`)}> 
    <section className={css(tw`rounded m-6 p-6 prose bg-white`)}>
      <p>Created by @amorris@merveilles.town, Contact me with any questions.</p>
      <ul>
        <li>Inspired by <a href="https://webring.xxiivv.com/">{`{The Webring}`}</a> which created an initial hallway app.</li>
        <li>Built with <a href="https://vercel.com/">{`{Vercel}`}</a> using incremental static regeneration on a hobby plan.</li>
        <li>Feeds stored with <a href="https://airtable.com/">{`{Airtable}`}</a> on a free plan.</li>
      </ul>
      <p></p>
    </section>
  </main>
)

export default About
