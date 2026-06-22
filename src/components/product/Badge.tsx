interface BadgeProps {
  text: string
}

export default function Badge({ text }: BadgeProps) {
  return (
    <span
      className="inline-block text-white text-[12px] font-semibold px-[6px] py-[2px] rounded-[10px] lg:max-xl:font-normal lg:max-xl:leading-none lg:max-xl:text-center lg:max-xl:[font-family:Gilroy-SemiBold,var(--font-sans)] xl:font-normal xl:leading-none xl:text-center xl:[font-family:Gilroy-SemiBold,var(--font-sans)]"
      style={{ backgroundColor: 'var(--color-wyze-purple)' }}
    >
      {text}
    </span>
  )
}
