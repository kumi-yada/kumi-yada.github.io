import { CommissionClient } from '@commission-site/commission-client';
import { CommissionMeta } from '@commission-site/commission-shared';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SocialIcon } from 'react-social-icons';
import CommissionStatus from './commission-status';
import ContactForm, { ContactFormValue } from './contact-form';
import Showcase from './showcase';

export interface LandingPageProps {
  client: CommissionClient;
}

export function LandingPage({ client }: LandingPageProps) {
  const { t } = useTranslation();
  const [meta, setCommissionmeta] = useState(null as CommissionMeta | null);

  useEffect(() => {
    client
      .getCommissionMeta()
      .then((meta) => setCommissionmeta(meta))
      .catch(() => setCommissionmeta(null));
  }, []);

  const sendContact = async (contact: ContactFormValue) => {
    await client.sendContactMessage(contact);
  };

  const socialMedia = [
    'https://twitter.com/kumi_yada',
    'https://www.pixiv.net/users/58480310',
    'https://www.instagram.com/kumi_yada93',
    'https://www.youtube.com/channel/UCGhrMdAkUHi_8nc7qz_nE5Q',
    'https://kumi.fanbox.cc/',
  ];

  return (
    <div className="bg-slate-900 flex flex-col items-center p-4">
      <div className="flex flex-col w-full md:w-1/2 bg-white rounded-md">
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

        {meta && (
          <>
            <CommissionStatus meta={meta} />
            <h1 className="font-bold text-xl text-center p-4">Contact</h1>
            <ContactForm
              onSubmit={sendContact}
              disabled={
                !meta.commissionOpen || meta.filledSlots >= meta.maxSlots
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
