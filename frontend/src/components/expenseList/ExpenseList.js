import React from "react";
import { ExpenseOperations } from "../expenseOperations/ExpenseOperation";
export const ExpenseList = ({ expenses, history, auth, setFetchData }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Bill Image</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.expenseId}>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>
                <img
                  src={expense.attachmentUrl}
                  alt={expense.name}
                  width="256"
                  height="256"
                />
              </td>
              <td>
                <ExpenseOperations
                  expense={expense}
                  history={history}
                  auth={auth}
                  setFetchData={setFetchData}
                />
              </td>
            </tr>
          ))}

          <tr>
            <b>Total Expense:- &nbsp;</b>
            {expenses.map((x) => x.amount).reduce((a, b) => a + b, 0)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
