import { z } from "zod";

export const createBudgetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().emoji(),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number (e.g. 1000.00)"),
});

export const createBudgetWithUserSchema = createBudgetSchema.extend({
  userId: z.string(),
});

export const budgetByIdSchema = z.object({
  userId: z.string(),
  budgetId: z.string(),
})