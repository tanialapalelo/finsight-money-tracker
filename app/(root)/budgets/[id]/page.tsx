
import BudgetItem from "../../budgets/_components/BudgetItem";
// import AddExpense from "../_components/AddExpense";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pen, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditBudget from "@/components/EditBudget";
import { getBudgetById } from "@/lib/actions/budget.action";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { BudgetWithStats } from "@/types";
import Link from "next/link";
import HeaderBox from "@/components/HeaderBox";
import { getListExpense } from "@/lib/actions/transaction.action";
import TransactionsTable from "@/components/TransactionsTable";


const BudgetDetail = async ({ params }) => {
    
  const loggedIn = await getCurrentUser({ withFullUser: true })
  const budget = await getBudgetById({ userId: loggedIn!.id, budgetId: params.id });
  const expenses = await getListExpense(params.id) || [];

  /**
   * Get Budget Information
   */
  const getBudgetInfo = async () => {
    
  };

  /**
   * Get Latest Expenses
   */
  const getExpensesList = async () => {
   
  };

  /**
   * Used to Delete budget
   */
  const deleteBudget = async () => {
    
  };


  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <Link href="/budgets"><ArrowLeft className="cursor-pointer" /></Link>
          <HeaderBox title={`${budget[0].name} Detail`}/>
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budget[0]}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 mt-6 gap-5"
      >
        {budget ? (
          <BudgetItem budget={budget[0]} />
        ) : (
          <div
            className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
          ></div>
        )}
        {/* <AddExpense
          budgetId={params.id}
          user={"asd"}
        /> */}
      </div>
      <div className="mt-4">
        <TransactionsTable
          transactions={expenses}
        />
      </div>
    </div>
  );
}

export default BudgetDetail;
