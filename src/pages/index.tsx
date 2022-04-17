import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useCallback, useState } from 'react'
import { CheckBoxGroup } from 'components/CheckBoxGroup'
import { LineGraph } from 'components/LineGraph'
import {
  PrefDetail,
  PrefDetailResponse,
  PrefInfo,
  PrefsResponse,
} from 'types/prefecture'
import { getApi } from 'utils/getApi'

type ServerSideProps = {
  prefs: PrefInfo[]
}
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: NextPage<PageProps> = ({ prefs }) => {
  const [selectedPrefs, setSelectedPrefs] = useState<PrefDetail[]>([])

  const addPref = useCallback(
    async (prefCode: number) => {
      const newData = await getApi<PrefDetailResponse>(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`
      )
      setSelectedPrefs((postData) => [
        ...postData,
        {
          prefCode,
          prefName: prefs.find((v) => v.prefCode === prefCode)?.prefName || '',
          data:
            newData.result.data.find((v) => v.label === '総人口')?.data || [],
        },
      ])
    },
    [prefs]
  )

  const deletePref = useCallback((prefCode: number) => {
    setSelectedPrefs((postData) =>
      postData.filter((v) => v.prefCode !== prefCode)
    )
  }, [])

  return (
    <>
      <header>
        <h1>都道府県別の総人口推移グラフ</h1>
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
