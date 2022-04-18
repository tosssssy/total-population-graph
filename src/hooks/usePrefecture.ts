import { useState, useCallback } from 'react'
import { PrefInfo, PrefDetail, PrefDetailResponse } from 'types/prefecture'
import { getApi } from 'utils/getApi'

export const usePrefecture = (prefs: PrefInfo[]) => {
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

  return {
    selectedPrefs,
    addPref,
    deletePref,
  }
}
