import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { CheckBoxGroup } from 'components/CheckBoxGroup'
import { LineGraph } from 'components/LineGraph'
import { usePrefecture } from 'hooks/usePrefecture'
import { PrefInfo, PrefsResponse } from 'types/prefecture'
import { getApi } from 'utils/getApi'

type StaticProps = {
  prefs: PrefInfo[]
}
type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<PageProps> = ({ prefs }) => {
  const { selectedPrefs, addPref, deletePref } = usePrefecture(prefs)

  return (
    <>
      <Head>
        <title>都道府県別の総人口推移グラフ</title>
        <meta name='description' content='都道府県別の総人口推移グラフ' />
      </Head>

      <header>
        <h1>
          <span> 都道府県別の</span>
          <span> 総人口推移グラフ</span>
        </h1>
      </header>
      <main>
        <div id='main-container'>
          <CheckBoxGroup
            prefs={prefs}
            selectedPrefs={selectedPrefs}
            addPref={addPref}
            deletePref={deletePref}
          />
          <LineGraph displayPrefs={selectedPrefs} />
        </div>
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const prefsResponse = await getApi<PrefsResponse>(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  )
  return {
    props: {
      prefs: prefsResponse?.result || [],
    },
  }
}
