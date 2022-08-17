import { CommissionMeta } from '@commission-site/commission-shared';
import { useTranslation } from 'react-i18next';
import CommissionSlots from './commission-slots';

export interface CommissionStatusProps {
  meta: CommissionMeta | null;
}

export function CommissionStatus({ meta }: CommissionStatusProps) {
  const { t } = useTranslation();

  const status =
    meta && meta.commissionOpen ? (
      <CommissionSlots meta={meta} />
    ) : (
      t('landing.closed')
    );

  const color = meta?.commissionOpen ? '' : 'text-red-700';

  return (
    <div className={`text-xl font-bold p-4 text-center ${color}`}>{status}</div>
  );
}

export default CommissionStatus;
