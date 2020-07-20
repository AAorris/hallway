import 'styles/base.css'
import Head from 'next/head'
import Link from 'next/link'
// import Router from 'next/router'
import { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import tw from '@tailwindcssinjs/macro'

const SelectedNavItem = styled.div(tw`
  text-white
  pb-4 pt-5 ml-3
  border-solid border-0 border-b-2 border-white
`)

const UnselectedNavItem = styled.div(tw`
  text-gray-500
  pb-4 pt-5 ml-3
`)

const NavItem = ({pathname, name}) => {
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    setSelected(location.pathname === pathname)
  })
  const link = <Link href={pathname}><a>{name}</a></Link>
  if (!selected) return <UnselectedNavItem>{link}</UnselectedNavItem>
  return <SelectedNavItem>{link}</SelectedNavItem>
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hallway</title>
      </Head>
      <nav className={css(tw`pl-3 flex flex-row border-solid border-0 border-b border-gray-700`)}>
        <NavItem pathname="/" name="Hallway" />
        <NavItem pathname="/feeds" name="Feeds" />
      </nav>
      <Component {...pageProps} />
    </>
  )
}
