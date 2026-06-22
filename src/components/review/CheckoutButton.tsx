import { useState } from 'react'

export default function CheckoutButton() {
  const [confirmed, setConfirmed] = useState(false)

  const handleClick = () => {
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 3000)
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-[4px] py-[13px] px-[16px] text-white font-bold text-[17px] lg:max-xl:leading-none lg:max-xl:tracking-[0] xl:leading-none xl:tracking-[0]"
      style={{ backgroundColor: 'var(--color-wyze-purple)', fontFamily: '"TT Norms Pro", Manrope, system-ui, sans-serif' }}
    >
      {confirmed ? 'Thank you! (placeholder)' : 'Checkout'}
    </button>
  )
}
