import { ChangeEvent, FC, useCallback } from 'react'
import { PrefDetail, PrefInfo } from 'types/prefecture'

type Props = {
  prefs: PrefInfo[]
  selectedPrefs: PrefDetail[]
  addPref: (prefCode: number) => void
  deletePref: (prefCode: number) => void
}

export const CheckBoxGroup: FC<Props> = ({
  prefs,
  selectedPrefs,
  addPref,
  deletePref,
}) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, prefCode: number) => {
      if (e.target.checked) {
        addPref(prefCode)
      } else {
        deletePref(prefCode)
      }
    },
    [addPref, deletePref]
  )
  return (
    <div>
      {prefs.map((pref) => {
        const isSelected = selectedPrefs.find(
          (v) => v.prefCode === pref.prefCode
        )
        return (
          <label key={pref.prefCode}>
            <input
              type='checkbox'
              checked={isSelected ? true : false}
              onChange={(e) => onChange(e, pref.prefCode)}
            />
            <span>{pref.prefName}</span>
          </label>
        )
      })}
    </div>
  )
}
