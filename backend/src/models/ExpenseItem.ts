export interface ExpenseItem {
  userId: string
  expenseId: string
  createdAt: string
  name: string
  amount: number
  attachmentUrl?: string
}
