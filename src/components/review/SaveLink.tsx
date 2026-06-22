import { useState } from 'react'
import { useBundle } from '../../state/useBundle'
import { saveBundle } from '../../state/useLocalStorage'

export default function SaveLink() {
  const { state } = useBundle()
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    saveBundle(state)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="text-center">
      <a
        href="#"
        onClick={handleSave}
        className="text-[12px] lg:max-xl:text-[14px] xl:text-[14px] font-normal leading-[120%] tracking-[-0.02px] underline"
        style={{ color: 'var(--color-label-gray)', fontFamily: 'Gilroy-RegularItalic, var(--font-sans)', fontStyle: 'italic' }}
      >
        {saved ? 'Saved!' : 'Save my system for later'}
      </a>
    </div>
  )
}
