import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import {
  CommissionStatus,
  deliveredList,
  RequestStatus,
  slotsList,
  trelloHeaders,
} from '@commission-site/commission-shared';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { data } = await axios.get(
      `https://api.trello.com/1/cards/${event.pathParameters?.id}`,
      { headers: await trelloHeaders() }
    );

    const lastUpdated = data.dateLastActivity;
    const list = data.idList;
    const closed = data.closed;
    const labels: string[] = data.labels.map(
      (l: Record<string, string>) => l.color
    );

    let status: RequestStatus = RequestStatus.OPEN;

    if (labels.includes('red') || (!labels.includes('green') && closed)) {
      status = RequestStatus.REJECTED;
    } else if (labels.includes('green')) {
      if (closed || list === deliveredList) {
        status = RequestStatus.DELIVERED;
      } else if (!closed) {
        status =
          list === slotsList
            ? RequestStatus.IN_PROGRESS
            : RequestStatus.APPROVED;
      }
    } else if (labels.includes('yellow')) {
      status = RequestStatus.REVIEWED;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status,
        lastUpdated,
      } as CommissionStatus),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Request failed' }),
    };
  }
};
