import React from "react"
import {deleteExpense} from "../../api/expense-api"
import {
    Link
  } from "react-router-dom";
export const ExpenseOperations = ({expense,history,auth,setFetchData})=>{
    const onDelete= async()=>{
        await deleteExpense(auth.getIdToken(),expense.expenseId,setFetchData)
        history.replace('/');
    }
    return (<div>
            <button><Link to={`/editExpense/${expense.expenseId}`}>edit</Link></button> &nbsp;<button onClick={onDelete}>delete</button> 
    </div>)
}