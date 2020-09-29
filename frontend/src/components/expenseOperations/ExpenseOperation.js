import React from "react"
import {deleteExpense} from "../../api/expense-api"
export const ExpenseOperations = ({expense,history,auth})=>{
    const onDelete= async()=>{
        await deleteExpense(auth.getAccessToken(),expense.id)
        history.replace('/');
    }

    return (<div>
            <button>edit</button> &nbsp;<button onClick={onDelete}>delete</button> 
    </div>)
}