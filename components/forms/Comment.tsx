"use client"

import { currentUser } from '@clerk/nextjs';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
//import { UserValidation } from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { usePathname, useRouter } from 'next/navigation';
//import { ThreadValidation } from '../../lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';  
import { CommentValidation } from '@/lib/validations/thread';
import Image from 'next/image';
import { createComment } from '@/lib/actions/thread.actions';

interface Props {
   threadId: string;
   currentUserImg: string;
   currentUserId: string; 
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
  
     const form = useForm({
      resolver: zodResolver(CommentValidation),
       defaultValues: {
          thread: '',
       }
     }) 

      const onSubmit = async ( values: z.infer<typeof CommentValidation>) => {
        await createComment( threadId,
           values.thread,
           JSON.parse(currentUserId),
            pathname
        );
        
        form.reset();
      }  
    
  
  
    return (
    <div>
      <h1 className='text-white'>
       
      </h1>
      <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className='comment-form'>

         <FormField 
         control={form.control}
         name="thread" 
         render={({ field }) => (
           <FormItem className='flex flex-col w-full gap-3'>
             <FormLabel className='text-base-semibold text-light-2'>
               <Image   
                src={currentUserImg}
                alt="Profile image"
                width={24}
                height={24}
                className='rounded-full object-cover'
               /> 
             </FormLabel>
             <FormControl className="no-focus border
             border-dark-4 bg-dark-3 text-light-1">
               <Input 
                type="text"
                placeholder="Comment..."
                className="no-focus text-light-1 outline-none" 
                 {...field} 
                 /> 
             </FormControl>
             <FormMessage  />
           </FormItem> 
         )}
         />

         <Button>

         </Button>
      </form>
    </Form>
       
    </div>
  )
}

  export default Comment;
