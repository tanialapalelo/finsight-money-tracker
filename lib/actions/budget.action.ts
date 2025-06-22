"use server"

import { createBudgetWithUserSchema } from "@/validations/budget"
import { db } from "@/drizzle/db"
import { BudgetTable } from "@/drizzle/schema/budgets";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function insertBudget(budget: z.infer<typeof createBudgetWithUserSchema>) {
    const { success, data } = createBudgetWithUserSchema.safeParse(budget)
    if (!success) return
    try {
        const createdData = await db.insert(BudgetTable).values({
            name: data.name,
            amount: data.amount,
            icon: data.icon,
            userId: data.userId,
        }).returning({ id: BudgetTable.id });
        return createdData;
    } catch(error){
        console.error(error);
    }
}