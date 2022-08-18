import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import {
  CommissionContact,
  CommissionMeta,
  queueList,
  trelloHeaders,
} from '@commission-site/commission-shared';
import axios from 'axios';

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

    const apiResponse = JSON.parse(
      String.fromCharCode.apply(null, response.Payload)
    ) as APIGatewayProxyResult;
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

    const query = new URLSearchParams({
      idList: queueList, // TODO: make it configurable
      name: `Request from ${contact.name}`,
      desc: `${contact.message}\n\nReply to ${contact.email}`,
    });
    console.log(query.toString());
    const { data } = await axios.post(
      `https://api.trello.com/1/cards?${query.toString()}`,
      null,
      {
        headers: await trelloHeaders(),
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ id: data.id }),
    };
  } catch (err) {
    console.log(err);
    return error(err, 500);
  }
};
