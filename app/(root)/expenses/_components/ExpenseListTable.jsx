"use client"

import React from "react";

function ExpenseListTable({ expensesList }) {
  const expenses = expensesList ? JSON.parse(expensesList) : [];

  const deleteExpense = async (expense) => {
    console.log("delete");
  };
  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenses.map((data, index) => (
        <div className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2">
          <h2>{data.name}</h2>
          <h2>{data.amount}</h2>
          <h2>{data.createdAt}</h2>
          <h2
            onClick={() => deleteExpense(data)}
            className="text-red-500 cursor-pointer"
          >
            Delete
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
