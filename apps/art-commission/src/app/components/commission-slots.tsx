import { CommissionMeta } from '@commission-site/commission-shared';
import { useTranslation } from 'react-i18next';

export interface CommissionSlotsProps {
  meta: CommissionMeta;
}

export function CommissionSlots({ meta }: CommissionSlotsProps) {
  const { t } = useTranslation();

  const slots = `${t('landing.slots')}: ${meta.filledSlots} / ${meta.maxSlots}`;
  const full = meta.filledSlots >= meta.maxSlots;

  return <span>{(full && t('landing.fullSlots')) || ''}</span>;
}

export default CommissionSlots;
