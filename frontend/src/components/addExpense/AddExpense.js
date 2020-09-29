import React, { useState } from "react";
import "./AddExpense.css"
import {createExpense} from '../../api/expense-api'
export const AddExpense = ({auth,history})=> {
 const [expenseName, setExpenseName] =useState('')
 const [expenseAmount, setExpenseAmount] =useState('')
 const [fileInfo, setFileInfo] = useState('')
 const [isUploading,setUploadState] = useState(false)
  const handleFileChange = (event) => {
    const files = event.target.files
    if (!files) return

    setFileInfo(files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (!fileInfo) {
        alert('File should be selected')
      }
      setUploadState(true)
      await createExpense(auth.getIdToken(),{expenseName,expenseAmount,fileInfo})
      setUploadState(false)
      history.replace('/');
    } catch (e) {
      alert('Could not upload a file: ' + e.message)
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
        <h1>Enter Expense</h1>
        <div className="form">
          <label>
            Expense Name &nbsp;
            <input type="text" onChange={expenseNameChangeHandler} />
          </label>
          <br />
          <label>
            Expense Amount &nbsp;
            <input type="text" onChange={amountChangeHandler} />
          </label>
          <br />
          <label>
            Attach Bill Image &nbsp;
            <input type="file" accept="image/*" placeholder="Image to upload"  onChange={handleFileChange} />
          </label>
            <button
            type="submit" onClick={handleSubmit}
            >
            Add Expense
          </button>
          <div style={{visibility:isUploading?'visible':'hidden'}}>
            Uploading.......
            </div>
        </div>
      </form>
    );
  }
