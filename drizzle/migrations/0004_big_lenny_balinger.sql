ALTER TABLE "transactions" ALTER COLUMN "categoryId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "icon" varchar;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "budgetId" uuid;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_budgetId_budgets_id_fk" FOREIGN KEY ("budgetId") REFERENCES "public"."budgets"("id") ON DELETE set null ON UPDATE no action;