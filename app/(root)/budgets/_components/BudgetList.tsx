import CreateBudget from './CreateBudget'
import BudgetItem from './BudgetItem'
import { BudgetWithStats } from '@/types'
import { getListBudget } from '@/lib/actions/budget.action';

interface Props {
  userId: string;
}

const BudgetList = async ({ userId }: Props) => {
  const budgetList: BudgetWithStats[] = await getListBudget(userId) ?? [];

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget userId={userId} />

        {budgetList?.length > 0 ? budgetList.map((budget, index) => (
          <BudgetItem budget={budget} key={index} />
        )) : [1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse' />
        ))}
      </div>
    </div>
  )
}

export default BudgetList
