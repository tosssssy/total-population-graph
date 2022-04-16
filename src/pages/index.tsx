import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { PrefectureDetail, Prefectures } from 'types/prefecture'
import { getApi } from 'utils/getApi'

type ServerSideProps = {
  prefectures: Prefectures
}
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const prefectures = await getApi<Prefectures>(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  )
  return { props: { prefectures } }
}

const Home: NextPage<PageProps> = ({ prefectures }) => {
  const data = getApi<PrefectureDetail>(
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1'
  )
  return (
    <>
      <div>{JSON.stringify(prefectures)}</div>
      <div>{JSON.stringify(data)}</div>
    </>
  )
}

export default Home
