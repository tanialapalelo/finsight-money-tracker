"use server"

import { createBudgetWithUserSchema } from "@/validations/budget"
import { db } from "@/drizzle/db"
import { BudgetTable } from "@/drizzle/schema/budgets";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function insertBudget(budget: z.infer<typeof createBudgetWithUserSchema>) {
    const { success, data } = createBudgetWithUserSchema.safeParse(budget)

    if (!success) return "Unable to insert budget.."

    try {

        const [createdData] = await db.insert(BudgetTable).values({
            name: data.name,
            amount: data.amount,
            userId: data.userId,
        }).returning({ id: BudgetTable.id });

        if (createdData == null) return "Unable to insert budget."
    } catch {
        return "Unable to insert budget"
    }
    redirect("/")
}