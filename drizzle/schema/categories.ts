import { relations } from "drizzle-orm"
import {
  pgTable,
  primaryKey,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"
import { UserTable } from "./users";

export const CategoryTable = pgTable("categories", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar("name", { length: 50 }).notNull(),
    icon: varchar("icon", { length: 50 }),
    createdBy: uuid().references(() => UserTable.id), // Optional: for custom categories
  });

  export const categoryRelations = relations(CategoryTable, ({ one }) => ({
    user: one(UserTable, {
      fields: [CategoryTable.createdBy],
      references: [UserTable.id],
    }),
  }));
