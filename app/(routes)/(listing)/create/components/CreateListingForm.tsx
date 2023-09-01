'use client'

import getCurrentUser from "@/actions/get-current-user"
import { categories } from "@/components/Categories"
import { ImageUpload } from "@/components/ImageUpload"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"




const formSchema = z.object({
    category: z .string(),
    imageSrc: z .string(),
    price: z.string().min(1, {
      message: "Set the price"
    }),
    title: z.string().min(1, {
      message: "Title must be  added"
    }),
    desc: z.string().min(1, {
      message: "add description"
    })
  })

const CreateListingForm = () => {

    const router = useRouter()
    const [isLoading, setIsLoading]= useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          category: '',
          imageSrc: '',
          desc: '',
          title: '',
          price: '',
      }
  })
  const onSubmit = async(data: z.infer<typeof formSchema>) =>{

    try {
        setIsLoading(true)
        await axios.post('/api/create', data)
        toast.success("Created Listing")
        router.refresh()
        router.push('/')

    }catch(error: any){
        toast.error('Something went wrong')
        
    }finally {
        setIsLoading(false)
    }

 }


  return (
    (
        <div className='flex gap-2 sm:flex-col lg:flex-row w-full lg:space-x-5 
            xl:space-x-10 md:h-full z-10 pt-32 xl:px-10'>
            <Card className='px-5 md:px-10 lg:px-20 lg:w-1/2 py-2 border-black/5
                hover:shadow-2xl shadow-xl  transition cursor-pointer w-full flex-col'>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8  pb-10 text-lg font-semibold">
                     <FormField control={form.control} name="imageSrc"
                     render={({field}) => (
                         <FormItem className="flex flex-col items-center 
                             justify-center space-y-6">
                             <FormControl>
                                 <ImageUpload value={field.value} 
                                     onChange={field.onChange} />
                             </FormControl>
                             <FormMessage/>
                         </FormItem>
                     )}/>

               
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                     {/*Title input form*/}
                     <FormField name="title" control={form.control}
                         render={({field}) => (
                             <FormItem className="col-span-2 md:col-span-1">
                                 <FormLabel className="text-2xl">Title</FormLabel>
                                 <FormControl >
                                     <Input disabled={isLoading} 
                                         placeholder="Long hair cut"
                                         {...field}
                                     />
                                 </FormControl>
                                 <FormDescription className="text-xs">
                                     Name for the service 
                                 </FormDescription>
                                 <FormMessage/>
                             </FormItem>
                         )}/>
                     
                     {/*Description input form*/}
                     <FormField name="desc" control={form.control}
                         render={({field}) => (
                             <FormItem className="col-span-2 md:col-span-1">
                                 <FormLabel className="text-2xl">Description</FormLabel>
                                 <FormControl >
                                     <Input disabled={isLoading}
                                         placeholder='Cut with scissors only- hair above 5cm'
                                         {...field}
                                     />
                                 </FormControl>
                                 <FormDescription className="text-xs">
                                    What client can expect from that service ?
                                 </FormDescription>
                                 <FormMessage/>
                             </FormItem>
                         )}/>
 
                     {/*Category input form*/}
                     <FormField name="category" control={form.control}
                         render={({field}) => (
                           <FormItem>
                             <FormLabel className="text-2xl">Category</FormLabel>
                             <Select disabled={isLoading}
                                 onValueChange={field.onChange}
                                 value={field.value}
                                 defaultValue={field.value}>
                                 <FormControl className="bg-background ">
                                     <SelectTrigger>
                                         <SelectValue defaultValue={field.value}
                                             placeholder='Select a category'/>
                                     </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                     {categories.map((cat) => (
                                       <SelectItem key={cat.label} value={cat.label}>
                                         {cat.label}
                                       </SelectItem>  
                                     ))}
                                 </SelectContent>
                             </Select>
                             <FormDescription>
                                 Select Category 
                             </FormDescription>
                             <FormMessage/>
                           </FormItem>  
                         )}/>

                 {/*price input*/}
                 <FormField name="price" control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel className="text-2xl">Price $</FormLabel>
                                <FormControl >
                                    <Input type="number" {...field}
                                    />        
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                 </div>
                 {/*Create listing*/}
                <div className=" flex justify-center md:pt-8 pt-6 w-full">
                    <Button size='lg' disabled={isLoading} 
                        className="hover:scale-105 transition hover:opacity-80 
                            w-[320px] md:w-[400px] xl:w-[500px] xl:p-3 text-lg xl:text-xl">
                        Create
                        <ArrowRight size={20} className="ml-2"/>
                    </Button>
                </div>
            </form>
        </Form>
        </Card>
        {/*Medium device image*/}
        <div className="lg:hidden hidden space-x-[500px] md:flex justify-between left-10 absolute top-40 ">
            <Card className="">
            <Image src='/images/pexels-photo-2608582.jpeg' alt="" 
                width={100} height={100} className="object-cover rounded-2xl"/>
            </Card>
        </div>

          {/*Desktop image*/}
        <Card className='hidden lg:flex lg:justify-center px-2 pb-5 lg:w-1/2  border-black/5
            hover:shadow-2xl shadow-xl transition cursor-pointer w-full'>
            <Image src='/images/pexels-photo-2608582.jpeg' alt="" 
                width={720} height={300} className="object-cover rounded-md"/>
        </Card>

        </div>
    )
  )
}

export default CreateListingForm