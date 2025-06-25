import { relations } from "drizzle-orm"
import {
  date,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"
import { UserTable } from "./users"
import { CategoryTable } from "./categories"
import { BudgetTable } from "./budgets"

export const transactionTypes = ["expense", "income"] as const
export type TransactionTypes = (typeof transactionTypes)[number]
export const transactionTypesEnum = pgEnum("transaction_types", transactionTypes)

// Defines the DB table statically (build time)
export const TransactionTable = pgTable("transactions", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  userId: uuid().notNull().references(() => UserTable.id, { onDelete: "cascade" }),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  description: text(),
  type: transactionTypesEnum().notNull(),
  categoryId: uuid().references(() => CategoryTable.id).notNull(),
  budgetId: uuid().references(() => BudgetTable.id, { onDelete: 'set null' }),
  date: date("date").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const userTransactionRelationships = relations(
  TransactionTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [TransactionTable.userId],
      references: [UserTable.id],
    }),
    category: one(CategoryTable, {
      fields: [TransactionTable.categoryId],
      references: [CategoryTable.id],
    }),
    budget: one(BudgetTable, {
      fields: [TransactionTable.budgetId],
      references: [BudgetTable.id],
    })
  })
)
