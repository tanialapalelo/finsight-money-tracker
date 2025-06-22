"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBudgetSchema } from "@/validations/budget";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { insertBudget } from "@/lib/actions/budget.action";
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
  userId: string;
}
  
const CreateBudget = ({ userId }: Props) => {
  console.log("uter", userId)
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof createBudgetSchema>>({
    defaultValues: {
      name: "",
      amount: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof createBudgetSchema>) => {
    try {
      console.log("data", data)
      const error = await insertBudget({
        name: data.name,
        amount: data.amount,
        icon: emojiIcon,
        userId: userId
      });
      console.log(error);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finally");
    }

  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
                <DialogDescription>
                  <div className="">
                    <Button
                      variant="outline"
                      className="text-lg my-4"
                      onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    >
                      {emojiIcon}
                    </Button>
                    <div className="absolute z-20">
                      <EmojiPicker
                        open={openEmojiPicker}
                        onEmojiClick={(e) => {
                          setEmojiIcon(e.emoji);
                          setOpenEmojiPicker(false);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (

                          <div className='form-item'>
                            <FormLabel className='form-label'>Budget Name</FormLabel>
                            <div className="flex w-full flex-col">
                              <FormControl>
                                <Input
                                  placeholder='e.g. Home Decor'
                                  className='input-class'
                                  type='text'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className='form-message mt-2' />
                            </div>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (

                          <div className='form-item'>
                            <FormLabel className='form-label'>Budget Amount</FormLabel>
                            <div className="flex w-full flex-col">
                              <FormControl>
                                <Input
                                  placeholder='e.g. 5000$'
                                  className='input-class'
                                  type='text'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className='form-message mt-2' />
                            </div>
                          </div>
                        )}
                      />
                      </div>
                  </div>
                  <Button
                    type="submit"
                    className="mt-5 w-full rounded-full"
                  >
                    Create Budget
                  </Button>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  
                </DialogClose>
              </DialogFooter>

            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
