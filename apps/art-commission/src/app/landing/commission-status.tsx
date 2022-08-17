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

  return <p className={`pt-4 text-center font-bold text-red-800`}>{status}</p>;
}

export default CommissionStatus;
