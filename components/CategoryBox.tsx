'use client'

import { LucideIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import qs from 'query-string';


interface CategoryBoxProps{
    label: string 
    icon: LucideIcon
    description?: string
    selected? : boolean
}


const CategoryBox = ({label, icon:Icon, description, selected }:
    CategoryBoxProps) => {

        const router = useRouter()
        const params = useSearchParams()

        const handleClick = useCallback(() => {

            let currentQuery = {}

            if(params){
                currentQuery = qs.parse(params.toString())
            }

            const updatedQuery: any = {
                ...currentQuery, 
                category: label
            }

            if(params?.get('category') === label){
                delete updatedQuery.category
            }

            const url = qs.stringifyUrl({
                query: updatedQuery,
                url: '/home'
            },{skipNull: true})

            router.push(url)

        },[label, params, router])

     

  return (
    <div 
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 
        hover:text-neutral-800 transition cursor-pointer h-[80px]
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected? 'text-neutral-800' : 'text-neutral-500'} `}>
        <Icon 
            data-testid='test-icon'
            size={24}/>
        <div className='font-medium text-sm'>
            {label}
        </div>
    </div>
  )
}

export default CategoryBox