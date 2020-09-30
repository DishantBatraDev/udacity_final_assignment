import * as uuid from 'uuid'
import { ExpenseItem } from '../models/ExpenseItem'

import { CreateExpenseRequest } from '../requests/CreateExpenseRequest'
import { parseUserId } from '../auth/utils'
import { ExpenseAccess } from '../dataLayer/expenseAccess'
import { UpdateExpenseRequest } from '../requests/UpdateExpenseRequest'

const expenseAccess = new ExpenseAccess()
export async function createExpense(
  createExpenseRequest: CreateExpenseRequest,
  jwtToken: string
): Promise<ExpenseItem> {
  const expenseId = uuid.v4()
  const userId = parseUserId(jwtToken)
  return await expenseAccess.createExpense({
    userId: userId,
    expenseId: expenseId,
    createdAt: new Date().toISOString(),
    name: createExpenseRequest.name,
    amount:createExpenseRequest.amount
  })
}

export async function deleteExpense(expenseToDelete: string, jwtToken: string){
  const userId = parseUserId(jwtToken)
  return await expenseAccess.deleteExpense(expenseToDelete,userId)
}


export async function getExpense(expenseId:string):Promise<ExpenseItem> {
  return await expenseAccess.getExpense(expenseId)
}

export async function getExpenses(jwtToken: string){
  const userId = parseUserId(jwtToken)
  return await expenseAccess.getExpenses(userId)
}

export async function  updateExpenseData(itemToUpdate: UpdateExpenseRequest,expenseId: string){
 await expenseAccess.updateExpenseData(itemToUpdate,expenseId)
}

export  async function updateExpenseImageURL(expenseItem: ExpenseItem, imageUrl: string) {
  await expenseAccess.updateExpenseImageURL(expenseItem,imageUrl);
}