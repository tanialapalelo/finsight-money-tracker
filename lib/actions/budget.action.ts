"use server"

import { budgetByIdSchema, createBudgetWithUserSchema } from "@/validations/budget"
import { db } from "@/drizzle/db"
import { BudgetTable } from "@/drizzle/schema/budgets";
import { z } from "zod";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { TransactionTable } from "@/drizzle/schema";

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

export async function getListBudget(userId : string){
    try {
        const result = await db.select({
            ...getTableColumns(BudgetTable),
            totalSpend: sql`
                SUM(CASE WHEN ${TransactionTable.type} = 'expense' THEN ${TransactionTable.amount} ELSE 0 END)
            `.mapWith(Number),
            totalItem: sql`
                COUNT(CASE WHEN ${TransactionTable.type} = 'expense' THEN 1 ELSE NULL END)
            `.mapWith(Number),
            })
            .from(BudgetTable)
            .leftJoin(TransactionTable, eq(BudgetTable.id, TransactionTable.budgetId))
            .where(eq(BudgetTable.userId, userId))
            .groupBy(BudgetTable.id)
            .orderBy(desc(BudgetTable.createdAt));

        return result;
    } catch (error) {
        console.error("An error occurred while getting the budgets:", error);
    }
}

export async function getBudgetById(params:z.infer<typeof budgetByIdSchema>) {
    try {
        const result = await db.select({
            ...getTableColumns(BudgetTable),
            totalSpend: sql`
                SUM(CASE WHEN ${TransactionTable.type} = 'expense' THEN ${TransactionTable.amount} ELSE 0 END)
            `.mapWith(Number),
            totalItem: sql`
                COUNT(CASE WHEN ${TransactionTable.type} = 'expense' THEN 1 ELSE NULL END)
            `.mapWith(Number),
            })
            .from(BudgetTable)
            .leftJoin(TransactionTable, eq(BudgetTable.id, TransactionTable.budgetId))
            .where(
                and(
                    eq(BudgetTable.userId, params.userId),
                    eq(BudgetTable.id, params.budgetId)
                )
            )
            .groupBy(BudgetTable.id)
            .orderBy(desc(BudgetTable.createdAt));
            
        return result;
    } catch (error) {
        console.error("An error occurred while getting the budgets:", error);
    }
}