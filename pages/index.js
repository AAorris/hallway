import 'core-js/modules/es.promise.all-settled'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'
import AbortController from 'abort-controller'

const Post = styled.div(tw`flex mb-6`)

const Index = ({ items }) => (
  <main className={css(tw`bg-white text-black`)}> 
    <section className={css(tw`absolute flex justify-center top-6 items-center w-screen h-screen pointer-events-none`)}>
      <div>
      <svg class="vector" width="300px" height="300px" xmlns="http://www.w3.org/2000/svg" baseProfile="full" version="1.1" style={{fill:'none',stroke:'black',strokeWidth:5,strokeLinecap:'square'}}>
        <g transform="translate(0,30)">
          <g transform="translate(150,150),rotate(120,0,0)">
            <path d="M0,-60 a60,60 0 1,0 0,120 l100,0"></path>   
          </g>
          <g transform="translate(150,150),rotate(240,0,0)">
            <path d="M0,-60 a60,60 0 1,0 0,120 l100,0"></path>   
          </g>
          <g transform="translate(150,150),rotate(0,0,0)">
            <path d="M0,-60 a60,60 0 1,0 0,120 l100,0"></path>   
          </g>
        </g>
      </svg>
      </div>
    </section>
  </main>
)

export default Index
