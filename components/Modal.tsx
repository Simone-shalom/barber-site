'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    onSubmit?: () => void
    title?: string
    body?: React.ReactElement
    footer?: React.ReactElement
    disabled?: boolean
}


const Modal = ({
    isOpen,onClose, title, body, footer,
}:ModalProps) => {



  return (
 <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="flex items-center justify-center flex-col z-50">
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