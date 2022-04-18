import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { CheckBoxGroup } from 'components/CheckBoxGroup'
import { LineGraph } from 'components/LineGraph'
import { usePrefecture } from 'hooks/usePrefecture'
import { PrefInfo, PrefsResponse } from 'types/prefecture'
import { getApi } from 'utils/getApi'

type ServerSideProps = {
  prefs: PrefInfo[]
}
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: NextPage<PageProps> = ({ prefs }) => {
  const { selectedPrefs, addPref, deletePref } = usePrefecture(prefs)

  return (
    <>
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

export const getServerSideProps: GetServerSideProps<
  ServerSideProps
> = async () => {
  const prefsResponse = await getApi<PrefsResponse>(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  )
  return { props: { prefs: prefsResponse.result } }
}
