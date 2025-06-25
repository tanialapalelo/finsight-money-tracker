"use server"

import { db } from "@/drizzle/db"
import { BudgetTable, TransactionTable } from "@/drizzle/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

export async function getListExpense(budgetId : string){
    try {
        const result = await db.select()
            .from(TransactionTable)
            .where(eq(TransactionTable.budgetId, budgetId))
            .orderBy(desc(BudgetTable.createdAt));
            
        return result;
    } catch (error) {
        console.error("An error occurred while getting the expenses:", error);
    }
}
