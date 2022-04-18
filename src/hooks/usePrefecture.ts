import { useState, useCallback } from 'react'
import { PrefInfo, PrefDetail, PrefDetailResponse } from 'types/prefecture'
import { getApi } from 'utils/getApi'

export const usePrefecture = (prefs: PrefInfo[]) => {
  const [selectedPrefs, setSelectedPrefs] = useState<PrefDetail[]>([])
  const [cache, setCache] = useState<PrefDetail[]>([])

  const addPref = useCallback(
    async (prefCode: number) => {
      let newData: PrefDetail

      const cachedData = cache.find((v) => v.prefCode === prefCode)
      if (cachedData) {
        newData = cachedData
      } else {
        const response = await getApi<PrefDetailResponse>(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`
        )
        newData = {
          prefCode,
          prefName: prefs.find((v) => v.prefCode === prefCode)?.prefName || '',
          data:
            response?.result.data.find((v) => v.label === '総人口')?.data || [],
        }
        setCache((postData) => [...postData, newData])
      }

      setSelectedPrefs((postData) => [...postData, newData])
    },
    [cache, prefs]
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
