export type PrefInfo = { prefCode: number; prefName: string }

export type PrefsResponse = {
  message: null
  result: Array<PrefInfo>
}

export type PrefDetail = {
  prefCode?: number
  boundaryYear: number
  data: Array<{ label: string; data: Array<{ year: number; value: number }> }>
}
