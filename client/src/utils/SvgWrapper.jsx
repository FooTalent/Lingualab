import ICONS from "./iconMapping"

export default function IconSvg({category, className}) {
  const SvgComponent = ICONS[category]

  return (
    <div>
        {SvgComponent && <SvgComponent className={className}/>}
    </div>
  )
}
