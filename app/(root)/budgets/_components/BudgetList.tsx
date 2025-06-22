"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import BudgetItem from './BudgetItem'
import { getListBudget } from '@/lib/actions/transaction.action'
import { BudgetWithStats } from '@/types'

interface Props {
  userId: string;
}

const BudgetList = ({ userId }: Props) => {
  const [budgetList, setBudgetList] = useState<BudgetWithStats[]>([]);

  useEffect(() => {
    userId && getBudgetList();
  }, [userId]);

  const getBudgetList = async () => {
    const result = await getListBudget(userId);
    setBudgetList(result ?? []);
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget userId={userId} />

        {budgetList?.length > 0 ? budgetList.map((budget, index) => (
          <BudgetItem budget={budget} key={index} />
        ))
          : [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse'>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default BudgetList