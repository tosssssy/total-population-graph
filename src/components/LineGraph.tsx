import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { FC, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { generatePrefCodeColor } from '../utils/generatePrefCodeColor'
import { PrefDetail } from 'types/prefecture'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const labels = [1980, 1990, 2000, 2010, 2020]

type Props = {
  displayPrefs: PrefDetail[]
}

export const LineGraph: FC<Props> = ({ displayPrefs }) => {
  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        ...displayPrefs.map((pref) => {
          return {
            label: pref.prefName,
            data: pref.data
              .filter((v) => labels.includes(v.year))
              .map((v) => v.value),
            backgroundColor: generatePrefCodeColor(pref.prefCode),
            borderColor: generatePrefCodeColor(pref.prefCode),
          }
        }),
      ],
    }
  }, [displayPrefs])
  return (
    <div>
      <Line data={data} />
    </div>
  )
}
