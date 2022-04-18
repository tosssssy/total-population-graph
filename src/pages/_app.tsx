import 'styles/globals.css'
import 'styles/main.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>都道府県別の総人口推移グラフ</title>
        <meta name='description' content='都道府県別の総人口推移グラフ' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
