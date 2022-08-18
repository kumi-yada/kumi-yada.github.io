import { CommissionMeta } from '@commission-site/commission-shared';
import { useTranslation } from 'react-i18next';
import { SocialIcon } from 'react-social-icons';
import CommissionStatusMessage from '../components/commission-status';
import { LinkButton } from '../components/link-button';
import Showcase from './showcase';

export interface LandingPageProps {
  meta: CommissionMeta | null;
}

export function LandingPage({ meta }: LandingPageProps) {
  const { t } = useTranslation();

  const socialMedia = [
    'https://twitter.com/kumi_yada',
    'https://www.pixiv.net/users/58480310',
    'https://www.instagram.com/kumi_yada93',
    'https://www.youtube.com/channel/UCGhrMdAkUHi_8nc7qz_nE5Q',
    'https://kumi.fanbox.cc/',
  ];

  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <img
          src="https://placekitten.com/200/200"
          alt="profile"
          className="max-w-xs mx-auto rounded-full"
        />
        <div className="text-center">
          <h1 className="uppercase text-4xl font-bold">Kumi</h1>
          <h2 className="uppercase font-light">{t('landing.job')}</h2>
          <div className="flex flex-row justify-center p-2 gap-2">
            {socialMedia.map((link) => (
              <SocialIcon
                target="_blank"
                key={link}
                style={{ width: ' 2.5em', height: '2.5em' }}
                url={link}
              />
            ))}
          </div>

          <CommissionStatusMessage meta={meta} />
        </div>
      </div>

      <div className="flex flex-col gap-2 m-4 items-center">
        <LinkButton to="/request">Request Commission</LinkButton>
        <LinkButton to="/tos">Terms of Service</LinkButton>
      </div>

      <Showcase />
    </>
  );
}

export default LandingPage;
