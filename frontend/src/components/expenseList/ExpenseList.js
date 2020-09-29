import React from "react";

export const ExpenseList = ({ expenses }) => {
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
              <td>{expense.Name}</td>
              <td>{expense.Amount}</td>
              <td>
                <img src={expense.imageUrl} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
