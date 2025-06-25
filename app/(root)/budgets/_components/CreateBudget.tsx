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
import { CurrencyInput } from "@/components/CurrencyInput";
import { useRouter } from "next/navigation";
import AddNewCard from "@/components/AddNewCard";
import { toast } from "sonner";

interface Props {
  userId: string;
}

const CreateBudget = ({ userId }: Props) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
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
      const newBudget = await insertBudget({
        name: data.name,
        amount: data.amount,
        icon: emojiIcon,
        userId: userId,
      });

      if (newBudget) {
        form.reset();
        setEmojiIcon("😀");
        setOpenDialog(false);
        toast("New Budget Created!");
        router.refresh();
      }

    } catch (error) {
      console.error(error);
    } finally {
      console.log("finally");
    }

  }
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <AddNewCard title="Create New Budget" />
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>

                <DialogDescription>

                  <div className="">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-lg my-4"
                      onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    >
                      {emojiIcon}
                    </Button>

                    {openEmojiPicker && (
                      <div className="absolute z-20 mx-0">
                        <EmojiPicker
                          open={openEmojiPicker}
                          onEmojiClick={(e) => {
                            setEmojiIcon(e.emoji);
                            setOpenEmojiPicker(false);
                          }}
                        />
                      </div>
                    )}
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
                              <CurrencyInput
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage className='form-message mt-2' />
                          </div>
                        </div>
                      )}
                    />
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
