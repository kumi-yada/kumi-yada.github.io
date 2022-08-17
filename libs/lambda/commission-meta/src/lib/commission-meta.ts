import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  DynamoDBClient,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
  commissionMetaColumn,
  commissionTable,
  commissionTableKey,
  CommissionMeta,
  slotsList,
  queueList,
  trelloHeaders,
} from '@commission-site/commission-shared';
import axios from 'axios';

export const getHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const urls = [
      `/lists/${slotsList}?fields=softLimit`,
      `/lists/${slotsList}/cards`,
      `/lists/${queueList}?fields=softLimit`,
      `/lists/${queueList}/cards`,
    ];
    const { data } = await axios.get(`https://api.trello.com/1/batch?urls=${urls.join(',')}`, { headers: await trelloHeaders() });

    const meta: CommissionMeta = {
      commissionOpen: data[3]['200'].length < (data[2]['200'].softLimit || 0),
      filledSlots: data[1]['200'].length,
      maxSlots: data[0]['200'].softLimit,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(meta),
    };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: 'request failed' };
  }
};

export const postHandler = async ({
  body,
}: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const meta = JSON.parse(body) as CommissionMeta;
    if (!meta || meta.maxSlots < 0 || meta.filledSlots < 0 || meta.filledSlots > meta.maxSlots) {
      return { statusCode: 400, body: 'Validation failed' };
    }

    const client = new DynamoDBClient({
      region: 'eu-central-1',
    });
    await client.send(
      new PutItemCommand({
        TableName: commissionTable,
        Item: {
          [commissionTableKey]: { S: commissionMetaColumn },
          data: { S: JSON.stringify(meta) },
        },
      })
    );

    return { statusCode: 200, body: 'success' };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: err };
  }
};
