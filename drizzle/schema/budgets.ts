import { pgTable, uuid, text, numeric, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { UserTable } from "./users";
import { TransactionTable } from "./transactions";

export const BudgetTable = pgTable("budgets", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  icon: varchar("icon"),
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});


export const budgetRelations = relations(BudgetTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [BudgetTable.userId],
    references: [UserTable.id],
  }),
  transactions: many(TransactionTable),
}));