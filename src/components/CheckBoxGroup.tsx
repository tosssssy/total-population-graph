import { FC } from 'react'
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
  return (
    <div id='checkbox-group-wrapper'>
      <p>都道府県</p>
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
                value={pref.prefCode}
                onChange={(e) =>
                  e.target.checked
                    ? addPref(Number(e.target.value))
                    : deletePref(Number(e.target.value))
                }
              />
              <span>{pref.prefName}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
