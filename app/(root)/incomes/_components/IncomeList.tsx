"use client";

import React, { useEffect, useState } from "react";
import IncomeItem from "./IncomeItem";
import CreateIncomes from "./CreateIncomes";

function IncomeList() {
  const [incomelist, setIncomelist] = useState([]);

  const getIncomelist = async () => {

  };

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncomes />
        {incomelist?.length > 0
          ? incomelist.map((budget, index) => (
            <IncomeItem budget={budget} key={index} />
          ))
          : [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
}

export default IncomeList;
