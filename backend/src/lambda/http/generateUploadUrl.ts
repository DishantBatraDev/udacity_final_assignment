import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import * as middy from 'middy'
import {  cors } from "middy/middlewares";
import {getExpense, updateExpenseImageURL} from '../../businessLogic/expense'

const bucketName = process.env.EXPENSES_IMAGES_BUCKET
const urlExpiration = +process.env.SIGNED_URL_EXPIRATION
const imageId=  uuid.v4() 
const s3 =  new AWS.S3({
  signatureVersion: 'v4' 
 })


export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const expenseId = event.pathParameters.expenseId
  const uploadUrl=getUploadUrl(imageId)
  
  const expenseItem =await getExpense(expenseId) 
  const imageUrl=`https://${bucketName}.s3.amazonaws.com/${imageId}`
  //update url
  await updateExpenseImageURL(expenseItem,imageUrl)

  //signed url
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      uploadUrl
    })
  }
})

handler.use(cors({
  credentials: true   //It means it allows headers that allow credentials from the browser
}))

function getUploadUrl(imageId: string) {
  return s3.getSignedUrl("putObject", {
    Bucket: bucketName,
    Key: imageId,
    Expires: urlExpiration,
  });
}