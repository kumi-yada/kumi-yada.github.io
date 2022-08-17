import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

export interface CommissionContact {
  name: string;
  email: string;
  message?: string;
}

export interface CommissionMeta {
  commissionOpen: boolean;
  maxSlots: number;
  filledSlots: number;
}

export const commissionTable = 'CommissionTable';
export const commissionTableKey = 'id';

export const commissionMetaColumn = '@commissionMeta';


export const queueList = '62fd0f9e9f5b0f3415179305';
export const slotsList = '62fd0fa2c42f2f193363f1fc';

const client = new SSMClient({ region: 'eu-central-1' });

export const trelloHeaders = async () => {
  const key = await client.send(new GetParameterCommand({ Name: 'trello_key', WithDecryption: true }));
  const token = await client.send(new GetParameterCommand({ Name: 'trello_token', WithDecryption: true }));

  return {
    'Authorization': `OAuth oauth_consumer_key="${key?.Parameter?.Value}", oauth_token="${token?.Parameter?.Value}"`
  }
};
