export type Prefectures = {
  message: null
  result: Array<{ prefCode: number; prefName: string }>
}

export type PrefectureDetail = {
  boundaryYear: number
  data: Array<{ label: string; data: Array<{ year: number; value: number }> }>
}
