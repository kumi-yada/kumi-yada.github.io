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
