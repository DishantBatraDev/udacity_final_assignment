import { apiEndpoint } from "../config";
import Axios from "axios";

export async function getExpenses(idToken) {
    console.log('Fetching expenses')

  const response = await Axios.get(`${apiEndpoint}/expenses`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Expenses:', response.data)
  return response.data.items
}

export async function createExpense(idToken, expense) {
    console.log('idToken  ',idToken)
    console.log('expense  ',expense)
    const payload = {name:expense.expenseName,amount:expense.expenseAmount}
    const response = await Axios.post(`${apiEndpoint}/expense`,  JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
    })
    
    const uploadUrl = await getUploadUrl(idToken,response.data.item.id)
    await uploadFile(uploadUrl,expense.fileInfo)
}

export async function patchExpense(idToken, expenseId, updatedExpense) {}

export async function deleteExpense(idToken, expenseId) {
    console.log('idToken  ',idToken)
    console.log('expense  ',expenseId)

    await Axios.delete(`${apiEndpoint}/expense/${expenseId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      })
}

export async function getUploadUrl(idToken,expenseId) {
    const response = await Axios.post(`${apiEndpoint}/expense/${expenseId}/attachment`, '', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      })
      return response.data.uploadUrl
}

export async function uploadFile(uploadUrl, file) {
    await Axios.put(uploadUrl, file)
}
