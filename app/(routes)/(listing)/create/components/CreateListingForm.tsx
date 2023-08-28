'use client'

import getCurrentUser from "@/actions/get-current-user"
import { categories } from "@/components/Categories"
import { ImageUpload } from "@/components/ImageUpload"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ArrowRight } from "lucide-react"
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
        router.push('/')

    }catch(error: any){
        toast.error('Something went wrong')
        
    }finally {
        setIsLoading(false)
    }

 }


  return (
    (
        <div className='flex flex-col gap-2 w-full h-full z-10 pt-32 px-10 xl:px-40'>
            <p className="text-center text-3xl lg:text-4xl  pb-4"></p>
            <Card className='px-5 md:px-10 lg:px-20 py-6 border-black/5
        hover:shadow-2xl shadow-xl transition cursor-pointer w-full '>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 pb-10 text-lg font-semibold">
                     <FormField control={form.control} name="imageSrc"
                     render={({field}) => (
                         <FormItem className="flex flex-col items-center 
                             justify-center space-y-2">
                             <FormControl>
                                 <ImageUpload value={field.value} 
                                     onChange={field.onChange} />
                             </FormControl>
                             <FormMessage/>
                         </FormItem>
                     )}/>

               
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                     Short description, what client can expect from that service
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
        </div>
    )
  )
}

export default CreateListingForm