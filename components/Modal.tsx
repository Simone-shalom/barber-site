'use client'

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Card } from "./ui/card"
import {Check, Zap} from 'lucide-react'
import { Button } from "./ui/button"
import {useState} from 'react'
import { useLoginModal } from "@/hooks/use-login-modal"
import { useRegisterModal } from "@/hooks/use-register-modal"

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    onSubmit: () => void
    title?: string
    body?: React.ReactElement
    footer?: React.ReactElement
    disabled?: boolean
}


const Modal = ({
    isOpen,onClose, onSubmit, title, body, footer, disabled
}:ModalProps) => {

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()


  return (
 <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="flex items-center justify-center flex-col">
        {/*Title*/}
         <DialogHeader>
             <DialogTitle className='flex justify-center items-center flex-col
                 gap-y-2 pb-2'>
                 <div className='flex items-center gap-x-2 font-bold py-1'>
                    {title}
                 </div>
             </DialogTitle>
         </DialogHeader>

        {/*Body*/}
            <div className='px-6 flex w-full justify-center items-center'>
                {body}
            </div>

        {/*Footer*/}
         <DialogFooter>
           {footer}
         </DialogFooter>
     </DialogContent>
 </Dialog>
  )
}

export default Modal