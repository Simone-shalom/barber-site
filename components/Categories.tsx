'use client'

import { PocketKnife, Ruler, Scissors, ScissorsLineDashed} from "lucide-react"
import Container from "./Container"
import CategoryBox from "./CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"


export const categories = [
    {
        label: "Short Hair",
        icon: ScissorsLineDashed,
        desc: "Short hair - cut and trimmed with fade"
    },
    {
        label: "Trimmer Cut",
        icon: Ruler,
        desc: "Short Cut - cut only with trimmer "
    },
    {
        label: "Scissors Cut",
        icon: Scissors,
        desc: "Long hair - sides above 5 cm preferably"
    },
    {
        label: "Beard",
        icon: PocketKnife,
        desc: "Beard trimmed - shaver + trimming "
    },
]

const Categories = () => {

    const searchparams = useSearchParams()
    const category = searchparams?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === '/home'

    if(!isMainPage) {
        return null
    }

  return (
    <Container>
      <div className=' flex items-center justify-between overflow-x-auto'>
            {categories.map((item) => (
                <CategoryBox label={item.label} selected={category === item.label}
                    key={item.label} icon={item.icon}/>
            ))}
        </div>

    </Container>
  )
}

export default Categories