import React from "react";
import {ExpenseOperations} from "../expenseOperations/ExpenseOperation"
export const ExpenseList = ({ expenses, history,auth }) => {
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
            <tr>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>
                <img src={expense.imageUrl} alt={expense.name} width="128" height="128" />
              </td>
              <td>
                <ExpenseOperations expense={expense} history={history} auth={auth}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
