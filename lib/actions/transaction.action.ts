"use server"

import { db } from "@/drizzle/db"
import { BudgetTable, TransactionTable } from "@/drizzle/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

// export async function createTransaction(data: Transaction) {
//     const result  = await db
//         .insert(data)
//         .values({
//         name: name,
//         amount: amount,
//         createdBy: user?.primaryEmailAddress?.emailAddress,
//         icon: emojiIcon,
//         })
//         .returning({ insertedId: Incomes.id });

//     if (result) {
//         refreshData();
//         toast("New Income Source Created!");
//     }
// }


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