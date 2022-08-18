import { CommissionMeta } from '@commission-site/commission-shared';
import { useTranslation } from 'react-i18next';

export interface CommissionStatusMessageProps {
  meta: CommissionMeta | null;
}

export function CommissionStatusMessage({
  meta,
}: CommissionStatusMessageProps) {
  const { t } = useTranslation();

  const open = meta?.commissionOpen || true;
  const status = open ? '' : t('landing.closed');

  if (!status) {
    return <></>;
  }

  const color = !open ? 'text-red-800' : 'text-normal';
  return <p className={`pt-4 text-center font-bold ${color}`}>{status}</p>;
}

export default CommissionStatusMessage;
