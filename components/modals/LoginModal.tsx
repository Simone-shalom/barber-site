'use client'

import Modal from "../Modal"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import {} from 'lucide-react'
import Image from "next/image"
import { useLoginModal } from "@/hooks/use-login-modal"
import { useRegisterModal } from "@/hooks/use-register-modal"
import { Input } from "../ui/input"

const LoginModal = () => {

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [isLoading, setIsLoading]= useState(false)

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])

    if(!mounted){
        return null
    }

   
   const onSubmit = (data:any) => {

   }

   const onToggle = () => {
    loginModal.onClose()
    registerModal.onOpen()
   }

 

   const bodyContent = (
    <div className='flex flex-col gap-3 w-full px-3 text-lg'>
        <Input placeholder="Email" type="email"/>
        <Input placeholder="Password" type="password"/>

    </div>
)

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3 '>
          <Button>Login</Button>
          <hr />
           <Button variant='outline'>Login with Google 
            <span className="ml-2"> 
              <Image src='/images/google.png' alt="Google" height={30} width={20}/></span>
            </Button>
            <div className='text-neutral-500 text-center mt-4 font-light'>
              <div className='flex items-center gap-2 justify-center'>
                <div>
                Don't have an account yet?
                </div>
                <div onClick={onToggle}
                    className='font-semibold cursor-pointer'>Register</div>

              </div>
            </div>
        </div>
    )

  return (
    <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Login'
    onClose={loginModal.onClose} 
    onSubmit={()=> {}} body={bodyContent} footer={footerContent} />

  )
}

export default LoginModal