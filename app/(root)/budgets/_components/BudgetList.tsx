"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'

import BudgetItem from './BudgetItem'

interface Props {
  userId: string;
}

const BudgetList = ({ userId }: Props) => {

  const [budgetList,setBudgetList]=useState([]);

  useEffect(() => {
    console.log("Received userId in client:", userId);
  }, [userId]);
  
  
  const getBudgetList=async()=>{

    console.log("budgetlist");
    

  }
  const mockBudgets = [
    {
      id: "1",
      name: "Groceries",
      icon: "🛒",
      amount: 500,
      totalSpend: 320,
      totalItem: 12,
    },
    {
      id: "2",
      name: "Home Decor",
      icon: "🏡",
      amount: 1000,
      totalSpend: 250,
      totalItem: 5,
    },
    {
      id: "3",
      name: "Fitness",
      icon: "🏋️‍♂️",
      amount: 300,
      totalSpend: 275,
      totalItem: 8,
    },
    {
      id: "4",
      name: "Entertainment",
      icon: "🎮",
      amount: 600,
      totalSpend: 600,
      totalItem: 15,
    },
    {
      id: "5",
      name: "Travel",
      icon: "✈️",
      amount: 2000,
      totalSpend: 1540,
      totalItem: 7,
    },
  ];

  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget userId={userId}/>

        {mockBudgets?.length>0? mockBudgets.map((budget,index)=>(
          <BudgetItem budget={budget} key={index} />
        ))
      :[1,2,3,4,5].map((item,index)=>(
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