import { CommissionMeta } from '@commission-site/commission-shared';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import CommissionStatus from '../components/commission-status';
import Showcase from './showcase';
import { FaArrowRight } from 'react-icons/fa';

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
      <div className="p-4">
        <img
          src="https://placekitten.com/300/200"
          alt="profile"
          className="max-w-xs mx-auto"
        />
        <div className="text-center">
          <h1 className="uppercase">Kumi</h1>
          <div className="flex flex-row justify-center p-2 gap-2">
            {socialMedia.map((link) => (
              <SocialIcon
                style={{ width: ' 2.5em', height: '2.5em' }}
                url={link}
              />
            ))}
          </div>
          <p>{t('landing.description')}</p>

          {meta && <CommissionStatus meta={meta} />}
        </div>
      </div>

      <h1 className="font-bold text-xl text-center p-4">Portfolio</h1>
      <Showcase />

      <div className="flex flex-col gap-2 m-4 items-center">
        <Link
          to="/request"
          className="rounded-full bg-red-100 border px-4 py-2 flex flex-row items-center gap-4"
        >
          Request Commission
          <FaArrowRight />
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
