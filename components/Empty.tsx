'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { useLoginModal } from "@/hooks/use-login-modal";

interface EmptyProps{
    title: string;
    desc: string;
    login?: boolean;
    home?: boolean;
    create?: boolean;
}

const Empty = ({title, desc, login, home, create} : EmptyProps) => {

    const loginModal = useLoginModal()

  return (
    <div className="pt-48 flex flex-col items-center justify-center space-y-2">
        <div className="text-3xl font-bold">
            {title}
        </div>
        <div className="text-lg text-gray-800">
            {desc}
        </div>
        <div className="pt-5 space-x-2">
            {home && (
                 <Link href='/home'>
                    <Button>
                        Home 
                    </Button>
                </Link>
            )}
            {login && (
                 <Button onClick={loginModal.onOpen}>
                    Login
                </Button>
            )}
             {create && (
                 <Link href='/create'>
                    <Button>
                        Create 
                    </Button>
                </Link>
            )}
          
        </div>
    </div>
  )
}

export default Empty