import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
  commissionMetaColumn,
  commissionTable,
  commissionTableKey,
  CommissionMeta,
} from '@commission-site/commission-shared';

const client = new DynamoDBClient({
  region: 'eu-central-1',
});

export const getHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const response = await client.send(
      new GetItemCommand({
        TableName: commissionTable,
        Key: {
          [commissionTableKey]: { S: commissionMetaColumn },
        },
      })
    );

    const data = JSON.parse(response.Item.data.S);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: err };
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
