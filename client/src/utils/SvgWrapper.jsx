import ICONS from "./iconMapping"

export default function IconSvg({category, className}) {
  const SvgComponent = ICONS[category]

  return (
    <div className={className}>
        {SvgComponent && <SvgComponent/>}
    </div>
  )
}
