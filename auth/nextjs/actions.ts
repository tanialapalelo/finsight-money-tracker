"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { db } from "@/drizzle/db"
import { OAuthProvider, UserTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "../core/passwordHasher"
import { cookies } from "next/headers"
import { authFormSchema } from "@/lib/utils"
import { createUserSession, removeUserFromSession } from "../core/session"
import { getOAuthClient } from "../core/oauth/base"

const signInSchema = authFormSchema("sign-in");
type SignInData = z.infer<typeof signInSchema>;
const signUpSchema = authFormSchema("sign-up");
type SignUpData = z.infer<typeof signUpSchema>;

export async function signIn(unsafeData: SignInData) {
  const { success, data } = signInSchema.safeParse(unsafeData)

  if (!success) return "Unable to log you in"

  const user = await db.query.UserTable.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(UserTable.email, data.email),
  })

  if (user == null || user.password == null || user.salt == null) {
    return "Unable to log you in"
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  })

  if (!isCorrectPassword) return "Unable to log you in"

  await createUserSession(user, await cookies())

  redirect("/")
}

export async function signUp(unsafeData: SignUpData) {
  const { success, data } = signUpSchema.safeParse(unsafeData)

  if (!success) return "Unable to create account"

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  })

  if (existingUser != null) return "Account already exists for this email"

  try {
    const salt = generateSalt()
    const hashedPassword = await hashPassword(data.password, salt)

    const [user] = await db
      .insert(UserTable)
      .values({
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address1,
        postalCode: data.postalCode,
        city: data.city,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role })

    if (user == null) return "Unable to create account"
    await createUserSession(user, await cookies())
  } catch {
    return "Unable to create account"
  }
  redirect("/")
}

export async function logOut() {
  await removeUserFromSession(await cookies())
  redirect("/")
}

export async function oAuthSignIn(provider: OAuthProvider) {
  const oAuthClient = getOAuthClient(provider)
  redirect(oAuthClient.createAuthUrl(await cookies()))
}
