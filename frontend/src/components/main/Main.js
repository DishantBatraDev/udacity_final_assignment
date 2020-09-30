import React from "react";
import { ExpenseList } from "../expenseList/ExpenseList";

export const Main = ({ expenses ,isLoggedIn,history,auth,setFetchData }) => {
  if(isLoggedIn){
    return <ExpenseList expenses={expenses} history={history} auth={auth} setFetchData={setFetchData}/>;
  }
  return ""
};
