import { useTranslation } from 'react-i18next';
import { CardHeader } from '../components/card-header';

export function PricesPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col justify-between grow">
      <CardHeader backTo="../">{t('landing.prices')}</CardHeader>
      <CardHeader backTo="../">{t('landing.prices')}</CardHeader>
    </div>
  );
}
