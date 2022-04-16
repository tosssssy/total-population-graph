// 12,180,234は適当な数字
// 同じnumに対しては毎回同じ色を返す
export const generatePrefCodeColor = (num: number) => {
  const r = (num * 12) % 256
  const g = (num * 180) % 256
  const b = (num * 234) % 256
  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}
