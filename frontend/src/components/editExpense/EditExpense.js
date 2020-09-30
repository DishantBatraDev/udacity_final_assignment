import React, { useState } from "react";
import "./EditExpense.css"
import {patchExpense} from '../../api/expense-api'
import {
    useParams
  } from "react-router-dom";
export const EditExpense = ({auth,history,setFetchData,expenses})=> {
const {expenseId} =useParams()
const expense = expenses.filter(x=>x.expenseId===expenseId)[0]
 const [expenseName, setExpenseName] =useState(expense.name)
 const [expenseAmount, setExpenseAmount] =useState(expense.amount)
 const [isUploading,setUploadState] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setUploadState(true)
      await patchExpense(auth.getIdToken(),expense.expenseId,{name:expenseName,amount:expenseAmount})
      setUploadState(false)
      setFetchData(true)
      history.replace('/');
    } catch (e) {
      alert('Unable to update the expenses' + e.message)
    } finally {
    }
  }
  const expenseNameChangeHandler = (event) => {
    setExpenseName(event.target.value );
  };

  const amountChangeHandler = (event) => {
    setExpenseAmount(event.target.value );
  };

    return (
      <form>
        <h1>Update Expense</h1>
        <div className="form">
          <label>
            Expense Name &nbsp;
            <input type="text" value={expenseName} onChange={expenseNameChangeHandler} />
          </label>
          <br />
          <label>
            Expense Amount &nbsp;
            <input type="text" value={expenseAmount} onChange={amountChangeHandler} />
          </label>
          <br />
          <label>
             Bill Image &nbsp;
             <img src={expense.attachmentUrl} alt={expense.name} width="256" height="256" />
          </label>
            <button
            type="submit" onClick={handleSubmit}
            >
            Update Expense
          </button>
          <div style={{visibility:isUploading?'visible':'hidden'}}>
            Uploading.......
            </div>
        </div>
      </form>
    );
  }
