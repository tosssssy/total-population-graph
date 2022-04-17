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
const labels = [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020]
const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 15,
        font: {
          size: 16,
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: '年度',
        align: 'end',
      },
    },
  },
} as const

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
    <div id='line-graph-wrapper'>
      <span>人口数</span>
      <Line width={'100%'} height={'100%'} data={data} options={options} />
    </div>
  )
}
