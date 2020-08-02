import 'core-js/modules/es.promise.all-settled'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'

const Index = () => (
  <main className={css(tw`bg-white text-black`)}> 
    <section className={css(tw`w-screen h-screen pointer-events-none flex p-6 pb-12`)} style={{width: '100vw'}}>
      <div className={css(tw`grid grid-flow-row grid-cols-4 grid-rows-5 gap-4 justify-center content-center text-center text-xl sm:text-6xl w-screen`)}>
        {['Y O U  A R E  I N   T H E  H A L L W A Y  '.split(' ').map(letter => 
          <div>{letter}</div>)]}
      </div>
    </section>
  </main>
)

export default Index
