export type PrefInfo = { prefCode: number; prefName: string }

export type PrefDetail = {
  prefCode: number
  prefName: string
  data: Array<{ year: number; value: number }>
}

export type PrefsResponse = {
  message: null
  result: Array<PrefInfo>
}

export type PrefDetailResponse = {
  message: null
  result: {
    boundaryYear: number
    data: Array<{ label: string; data: Array<{ year: number; value: number }> }>
  }
}
