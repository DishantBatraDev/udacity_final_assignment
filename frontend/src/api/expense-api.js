import { apiEndpoint } from "../config";
import Axios from "axios";

export async function getExpenses(idToken) {}

export async function createExpense(idToken, newTodo) {}

export async function patchExpense(idToken, expenseId, updatedExpense) {}

export async function deleteExpense(idToken, todoId) {}

export async function getUploadUrl(idToken, expenseId) {}

export async function uploadFile(uploadUrl, file) {}
