'use client'

import Modal from "../Modal"
import { useCallback, useState, useEffect } from "react"
import { Button } from "../ui/button"
import {} from 'lucide-react'
import Image from "next/image"
import { useRegisterModal } from "@/hooks/use-register-modal"
import { useLoginModal } from "@/hooks/use-login-modal"
import { Input } from "../ui/input"

const RegisterModal = () => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const [isLoading, setIsLoading]= useState(false)

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])

    if(!mounted){
        return null
    }

   
    const onToggle = () => {
      registerModal.onClose()
      loginModal.onOpen()
    }

   
   const onSubmit = (data:any) => {

   }

 

    const bodyContent = (
        <div className='flex flex-col gap-2 w-full'>
            <Input placeholder="Email"/>
            <Input placeholder="Name"/>
            <Input placeholder="Password"/>

        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3 '>
          <Button>Register</Button>
          <hr />
           <Button variant='outline'>Register with Google 
            <span className="ml-2"> 
              <Image src='/images/google.png' alt="Google" height={30} width={20}/></span>
            </Button>
            <div className='text-neutral-500 text-center mt-4 font-light'>
              <div className='flex items-center gap-2 justify-center'>
                <div>
                Already have an account?
                </div>
                <div onClick={onToggle}
                    className='font-semibold cursor-pointer'>Login</div>

              </div>
            </div>
        </div>
    )

  return (
    <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Register'
    onClose={registerModal.onClose} 
    onSubmit={()=> {}} body={bodyContent} footer={footerContent} />

  )
}

export default RegisterModal