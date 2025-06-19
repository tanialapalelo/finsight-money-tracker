
import { db } from "@/drizzle/db"

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