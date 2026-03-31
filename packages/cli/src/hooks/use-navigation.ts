import { useState } from 'react'
import { useInput } from 'ink'
import { TABS } from '../theme.js'

export function useNavigation(opts: { isActive: boolean }) {
  const [activeTab, setActiveTab] = useState(0)
  const tabCount = TABS.length

  useInput(
    (input, key) => {
      if (key.leftArrow || input === 'h') {
        setActiveTab((t) => (t - 1 + tabCount) % tabCount)
      }
      if (key.rightArrow || input === 'l') {
        setActiveTab((t) => (t + 1) % tabCount)
      }
      if (key.tab && !key.shift) {
        setActiveTab((t) => (t + 1) % tabCount)
      }
      if (key.tab && key.shift) {
        setActiveTab((t) => (t - 1 + tabCount) % tabCount)
      }
      if (input >= '1' && input <= String(tabCount)) {
        setActiveTab(parseInt(input) - 1)
      }
    },
    { isActive: opts.isActive }
  )

  return { activeTab, setActiveTab, tabCount }
}
