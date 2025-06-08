import { getOAuthClient } from "@/auth/core/oauth/base"
import { createUserSession } from "@/auth/core/session"
import { db } from "@/drizzle/db"
import {
  OAuthProvider,
  oAuthProviders,
  UserOAuthAccountTable,
  UserTable,
} from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { z } from "zod"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider: rawProvider } = await params
  const code = request.nextUrl.searchParams.get("code")
  const state = request.nextUrl.searchParams.get("state")
  const provider = z.enum(oAuthProviders).parse(rawProvider)
  console.log("code", code);
  console.log("state", state);
  console.log("prov", provider);
  
  if (typeof code !== "string" || typeof state !== "string") {
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again."
      )}`
    )
  }

  const oAuthClient = getOAuthClient(provider)
  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies())
    console.log("tes");
    console.log(oAuthUser);
    
    
    const user = await connectUserToAccount(oAuthUser, provider)
    await createUserSession(user, await cookies())
  } catch (error) {
    console.error(error)
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again."
      )}`
    )
  }

  redirect("/")
}

function connectUserToAccount(
  { id, email, name }: { id: string; email: string; name: string },
  provider: OAuthProvider
) {
  
  // Safely split the name
  const [firstName, ...rest] = name.trim().split(" ")
  const lastName = rest.join(" ") || ""

  // get if our app already has the user
  return db.transaction(async trx => {
    let user = await trx.query.UserTable.findFirst({
      where: eq(UserTable.email, email),
      columns: { id: true, role: true },
    })

    if (user == null) {
      const [newUser] = await trx
        .insert(UserTable)
        .values({
          email: email,
          firstName,
          lastName,
        })
        .returning({ id: UserTable.id, role: UserTable.role })
      user = newUser
    }

    await trx
      .insert(UserOAuthAccountTable)
      .values({
        provider,
        providerAccountId: id,
        userId: user.id,
      })
      .onConflictDoNothing()

    return user
  })
}
