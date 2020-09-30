import { ExpenseItem } from '../models/ExpenseItem'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWS from 'aws-sdk'
import * as AWSXray from 'aws-xray-sdk'
import { UpdateExpenseRequest } from '../requests/UpdateExpenseRequest'

const XAWS = AWSXray.captureAWS(AWS)

export class ExpenseAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly expensesTable = process.env.EXPENSES_TABLE,
    private readonly expenseIdIndex = process.env.EXPENSE_ID_INDEX
  ) {}

  async createExpense(expense: ExpenseItem): Promise<ExpenseItem> {
    console.log(`Creating an expense item with id ${expense.expenseId}`)

    await this.docClient
      .put({
        TableName: this.expensesTable,
        Item: expense
      })
      .promise()
    return expense
  }

  async deleteExpense(expenseId: string, userId: string) {
    console.log(`deleting  a expense item with id ${expenseId}`)
    var result =await this.getExpense(expenseId)
    console.log('deleting item '+JSON.stringify(result))
    await this.docClient
      .delete({
        TableName: this.expensesTable,
        Key: {
          userId: userId,
          createdAt:result.createdAt
        },
        ConditionExpression: 'expenseId= :val',
        ExpressionAttributeValues: {
          ':val': expenseId
        }
      })
      .promise()
  }

  async getExpense(expenseId: string): Promise<ExpenseItem> {
    console.log(`getting expense details for the expense id ${expenseId}`)
    const result = await this.docClient
      .query({
        TableName: this.expensesTable,
        IndexName: this.expenseIdIndex,
        KeyConditionExpression: "expenseId = :expenseId",
        ExpressionAttributeValues:{
          ':expenseId': expenseId 
      }
      })
      .promise()
    return result.Items[0] as ExpenseItem
  }

  async getExpenses(userId: string) {
    console.log(`getting all expense for userid ${userId}`)
    const result = await this.docClient
      .query({
        TableName: this.expensesTable,
        KeyConditionExpression:'userId= :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      }).promise()
    return result.Items
  }

  async updateExpenseImageURL(expenseItem: ExpenseItem, imageUrl: string) {
    var params = {
      TableName: this.expensesTable,
      Key: {
        userId: expenseItem.userId,
        createdAt: expenseItem.createdAt
      },
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': imageUrl
      },
      ReturnValues: 'UPDATED_NEW'
    }
     await this.docClient.update(params).promise()
  }

  async updateExpenseData(itemToUpdate: UpdateExpenseRequest,expenseId: string){
    const expenseItem =await this.getExpense(expenseId)
    var params = {
      TableName: this.expensesTable,
      Key: {
        userId: expenseItem.userId,
        createdAt: expenseItem.createdAt
      },
      UpdateExpression: "set #name = :val, #amount=:amount",
      ExpressionAttributeNames:{ //An expression attribute name is a placeholder that you use in an Amazon DynamoDB expression as an alternative to an actual attribute name. An expression attribute name must begin with a pound sign (#), and be followed by one or more alphanumeric characters.
        "#name":"name",  // to handle reserved word of the dynamo db
        "#amount":"amount"
      },
      ExpressionAttributeValues:{
          ":val":itemToUpdate.name,
          ":amount":itemToUpdate.amount
      },
      ReturnValues:"UPDATED_NEW"
    }
    await this.docClient.update(params).promise()
  }
}

function createDynamoDBClient() {
  return new XAWS.DynamoDB.DocumentClient()
}
