import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import {
  CommissionContact,
  CommissionMeta,
} from '@commission-site/commission-shared';
import axios from 'axios';

const client = new SSMClient({ region: 'eu-central-1' });
const lambda = new LambdaClient({ region: 'eu-central-1' });

export const error = (
  error: any,
  statusCode: number
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify({ error }),
  };
};

export const success = (
  message: string,
  statusCode = 200
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify({ message }),
  };
};

export const handler = async ({
  body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const response = await lambda.send(
      new InvokeCommand({ FunctionName: 'GetCommissionMeta' })
    );

    if (response.StatusCode !== 200) {
      return error('Failed to get commission meta', 500);
    }

    const apiResponse = JSON.parse(String.fromCharCode.apply(null, response.Payload)) as APIGatewayProxyResult;
    const meta = JSON.parse(apiResponse.body) as CommissionMeta;

    if (!meta.commissionOpen) {
      return error('Commissions are closed', 400);
    }

    if (!body) {
      return error('Body missing', 400);
    }

    const contact = JSON.parse(body) as CommissionContact;

    if (
      !contact.name ||
      !contact.email ||
      !contact.message ||
      contact.name?.length > 100 ||
      contact.email?.length > 100 ||
      contact.message?.length > 1000
    ) {
      return error('Validation failed', 400);
    }

    const key = await client.send(new GetParameterCommand({ Name: 'trello_key', WithDecryption: true }));
    const token = await client.send(new GetParameterCommand({ Name: 'trello_token', WithDecryption: true }));

    const query = new URLSearchParams({
      idList: '62fd0f9e9f5b0f3415179305', // TODO: make it configurable
      name: `Request from ${contact.name}`,
      desc: `${contact.message}\n\nReply to ${contact.email}`,
    });
    console.log(query.toString());
    await axios.post(`https://api.trello.com/1/cards?${query.toString()}`, null, {
      headers: {
        'Authorization': `OAuth oauth_consumer_key="${key.Parameter.Value}", oauth_token="${token.Parameter.Value}"`
      }
    });

    return success('Send successfully');
  } catch (err) {
    console.log(err);
    return error(err, 500);
  }
};
