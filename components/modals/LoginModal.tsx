'use client'

import Modal from "../Modal"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import {} from 'lucide-react'
import Image from "next/image"
import { useLoginModal } from "@/hooks/use-login-modal"
import { useRegisterModal } from "@/hooks/use-register-modal"
import { Input } from "../ui/input"
import {useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl,Form,  FormField, FormItem,
   FormLabel, FormMessage } from "../ui/form"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import {signIn} from 'next-auth/react'


const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
})


const LoginModal = () => {

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const router = useRouter()

  //  const [isLoading, setIsLoading]= useState(false)

    const [mounted, setMounted] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: '',
        password: ''
      },
    })

    const isLoading = form.formState.isSubmitting
  

    useEffect(() => {
        setMounted(true)
    },[])

    if(!mounted){
        return null
    }


   const onToggle = () => {
    loginModal.onClose()
    registerModal.onOpen()
   }

 
  
   const onSubmit = async(values: z.infer<typeof formSchema>) => {
      console.log(values)
      signIn('credentials', {
        ...values,
        redirect: false,
        callbackUrl: '/'
      }).then((callback) => {
        if(callback?.ok) {
            toast.success('Logged in successfully')
            router.refresh()
            loginModal.onClose()
        }
        if(callback?.error){
            toast.error('Callback Error')
        }
      })

   }

 
    const bodyContent = (
        <div className='flex flex-col gap-2 w-full'>
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="simon@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-center w-full pt-5">
                  <Button type="submit" className="w-[320px]">
                    Login
                  </Button>
                </div>
              </form>
            </Form>

        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
          <hr />
           <Button variant='outline'>Login with Google 
            <span className="ml-2"> 
              <Image src='/images/google.png' alt="Google" height={30} width={20}/></span>
            </Button>
            <div className='text-neutral-500 text-center mt-4 font-light'>
              <div className='flex items-center gap-2 justify-center'>
                <div>
                Don&apos;t have an account yet?
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