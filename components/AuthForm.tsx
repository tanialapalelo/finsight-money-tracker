"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomAuthInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/auth/nextjs/actions'

const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>()

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            if (type === "sign-up") {
                const error = await signUp(data);
                setError(error);

            }
            if (type === "sign-in") {
                const error = await signIn(data);
                setError(error);
            }

        } catch (error) {
            console.error(error);

        } finally {
            setIsLoading(false);
        }

    }

    return (
        <section className='auth-form'>
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Finsight logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Finsight</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {type === "sign-in" ? "Sign-in" : "Sign-up"}
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        Please enter your details
                    </p>
                </div>
            </header>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</p>}
                    {type === "sign-up" && (
                        <>
                            <div className='flex gap-4'>
                                <CustomInput control={form.control} name={"firstName"} label={"Firstname"} placeholder={"Enter your firstname"} />
                                <CustomInput control={form.control} name={"lastName"} label={"Lastname"} placeholder={"Enter your lastname"} />
                            </div>
                            <CustomInput control={form.control} name={"address1"} label={"Address"} placeholder={"Enter your address"} />
                            <CustomInput control={form.control} name={"city"} label={"City"} placeholder={"Enter your city"} />
                            <CustomInput control={form.control} name={"postalCode"} label={"Postal Code"} placeholder={"Example: 12345"} />
                            <CustomInput control={form.control} name={"dateOfBirth"} label={"Date of Birth"} placeholder={"YYYY-MM-DD"} />
                        </>
                    )}
                    <CustomInput control={form.control} name={"email"} label={"Email"} placeholder={"Enter your email"} />
                    <CustomInput control={form.control} name={"password"} label={"Password"} placeholder={"Enter your password"} />
                    <div className='flex flex-col gap-4'>
                        <Button type="submit" className='form-btn' disabled={isLoading}>
                            {isLoading ? (<> <Loader2 size={20} className='animate-spin' />Loading...</>) : type === "sign-in" ? "Sign In" : "Sign Up"}
                        </Button>
                    </div>
                </form>
            </Form>
            <footer className="flex justify-ccenter gap-1">
                <p className='text-14 font-normal text-gray-600'>
                    {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className='form-link'>
                    {type === "sign-in" ? "Sign Up" : "Sign In"}
                </Link>
            </footer>
        </section>
    )
}

export default AuthForm