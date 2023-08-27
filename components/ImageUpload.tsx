'use client'

import { useEffect, useState } from "react";
import {CldUploadButton} from 'next-cloudinary'
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean;
}

export const ImageUpload = ({value, onChange, disabled}:
    ImageUploadProps) => {

        const [mounted, setMounted] = useState(false)

        useEffect(() => {
            setMounted(true)
        },[])

    if(!mounted){
        return null
    }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
        <CldUploadButton
            onUpload={(result:any)=> onChange(result.info.secure_url) } 
            options={{maxFiles: 1}} uploadPreset="fs52murh">
            <div className="p-1 border-4 border-dashed border-primary/10
                rounded-lg hover:opacity-75 transition flex flex-col space-y-2
                items-center justify-center">
                <div className="relative w-60 h-60 flex flex-col space-y-0 items-center justify-center">
                <ImageIcon size={50} />
                <p>Add Image for the service</p>
                {value && (
                    <div className='absolute inset-0 w-full h-full'>
                        <Image alt='Upload' className="rounded-md object-cover" fill   src={value}/>
                    </div>
                )}
                </div>
            </div>

        </CldUploadButton>
    </div>
  )
}