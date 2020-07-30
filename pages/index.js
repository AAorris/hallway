import 'core-js/modules/es.promise.all-settled'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'

const Index = () => (
  <main className={css(tw`bg-white text-black`)}> 
    <section className={css(tw`w-screen h-screen pointer-events-none`)} style={{width: '100vw'}}>
      <div className={css(tw`pt-6 text-center sm:text-6xl`)} style={{
        fontWeight: 900, letterSpacing: '.2545ch'
      }}>
        YOU ARE
        <br />
        IN THE
        <br />
        HALLWAY
      </div>
    </section>
  </main>
)

export default Index
