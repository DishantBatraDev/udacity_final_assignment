import React from "react";
import { ExpenseList } from "../expenseList/ExpenseList";

export const Main = ({ expenses }) => {
  return <ExpenseList expenses={expenses} />;
};
