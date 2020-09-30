import { apiEndpoint } from "../config";
import Axios from "axios";

export async function getExpenses(authorizationToken) {
  console.log("Fetching expenses");

  const response = await Axios.get(`${apiEndpoint}/expenses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  console.log("Expenses:", response.data);
  return response.data.items;
}

export async function createExpense(authorizationToken, expense) {
  const payload = { name: expense.expenseName, amount: +expense.expenseAmount };
  const response = await Axios.post(
    `${apiEndpoint}/expenses`,
    JSON.stringify(payload),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );

  const uploadUrl = await getUploadUrl(
    authorizationToken,
    response.data.item.expenseId
  );
  await uploadFile(uploadUrl, expense.fileInfo);
}

export async function patchExpense(
  authorizationToken,
  expenseId,
  updatedExpense
) {
  await Axios.patch(`${apiEndpoint}/expenses/${expenseId}`, JSON.stringify(updatedExpense), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorizationToken}`
    }
  })
}

export async function deleteExpense(
  authorizationToken,
  expenseId,
  setFetchData
) {
  await Axios.delete(`${apiEndpoint}/expenses/${expenseId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorizationToken}`,
    },
  });
  setFetchData(true);
}

export async function getUploadUrl(authorizationToken, expenseId) {
  const response = await Axios.post(
    `${apiEndpoint}/expenses/${expenseId}/attachment`,
    "",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );
  return response.data.uploadUrl;
}

export async function uploadFile(uploadUrl, file) {
  await Axios.put(uploadUrl, file);
}
