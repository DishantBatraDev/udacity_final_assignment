import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { updateExpenseData } from '../../businessLogic/expense'
import { UpdateExpenseRequest } from '../../requests/UpdateExpenseRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const expenseId = event.pathParameters.expenseId
  const data: UpdateExpenseRequest = JSON.parse(event.body)

  await updateExpenseData(data,expenseId)
  return {
    statusCode: 202 ,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
    })
  }
}
