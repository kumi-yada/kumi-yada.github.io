import { CommissionMeta } from '@commission-site/commission-shared';
import { useTranslation } from 'react-i18next';

export interface CommissionStatusProps {
  meta: CommissionMeta | null;
}

export function CommissionStatus({ meta }: CommissionStatusProps) {
  const { t } = useTranslation();

  const full = meta && meta.filledSlots >= meta.maxSlots;
  const open = meta?.commissionOpen;
  const status = open ? full && t('landing.fullSlots') : t('landing.closed');

  if (!status) {
    return <></>;
  }

  const color = !open ? 'text-red-800' : 'text-normal';
  return <p className={`pt-4 text-center font-bold ${color}`}>{status}</p>;
}

export default CommissionStatus;
