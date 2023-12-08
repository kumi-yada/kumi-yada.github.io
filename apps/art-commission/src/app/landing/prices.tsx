import { useTranslation } from 'react-i18next';
import { CardHeader } from '../components/card-header';
import { PriceSlides } from './price-slides';

const prices: Record<string, string[]> = {
  '100€ - Half Body': [
    'https://pbs.twimg.com/media/F0X8tAHWcAAKmnY?format=jpg&name=small',
    'https://pbs.twimg.com/media/FVE4tF4XsAEUb8O?format=jpg&name=small',
    'https://pbs.twimg.com/media/FS0WGlSXEAI-8lM?format=jpg&name=small',
    'https://pbs.twimg.com/media/FLf6Eo_XsAcwd8R?format=jpg&name=small',
  ],
  '200€ - Full Body': [
    'https://pbs.twimg.com/media/FczL1PdXEAAz9Nz?format=jpg&name=small',
    'https://pbs.twimg.com/media/FczL1PdXEAAz9Nz?format=jpg&name=small',
    'https://pbs.twimg.com/media/FczL1PdXEAAz9Nz?format=jpg&name=small',
    'https://pbs.twimg.com/media/FczL1PdXEAAz9Nz?format=jpg&name=small',
  ],
};

export function PricesPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col justify-between grow">
      <CardHeader backTo="../">{t('landing.prices')}</CardHeader>
      <div className="flex flex-col gap-4">
        {Object.keys(prices).map((p) => (
          <PriceSlides key={p} price={p} images={prices[p]} />
        ))}
      </div>
      <CardHeader backTo="../">{t('landing.prices')}</CardHeader>
    </div>
  );
}
