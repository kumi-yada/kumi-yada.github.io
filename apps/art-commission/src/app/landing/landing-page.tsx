import { useTranslation } from 'react-i18next';
import { SocialIcon } from 'react-social-icons';
import {
  HiOutlineMail,
  HiOutlineClipboardList,
  HiCurrencyEuro,
  HiOutlineCurrencyEuro,
} from 'react-icons/hi';
import { Button } from '../components/link-button';
import Showcase from './showcase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const socialMedia = [
    'https://www.pixiv.net/users/58480310',
    'https://twitter.com/kumi_yada',
    'https://www.instagram.com/kumi_yada93',
    // 'https://www.youtube.com/channel/UCGhrMdAkUHi_8nc7qz_nE5Q',
    // 'https://kumi.fanbox.cc/',
  ];

  useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    i18n.changeLanguage(userLang);
  }, []);

  return (
    <>
      <div className="p-4 sm:p-16 flex flex-col sm:flex-row gap-8 sm:gap-16 mb-4">
        <img
          src="/assets/final.png"
          alt="profile"
          className="max-w-[10rem] mx-auto rounded-full border"
        />
        <div className="flex flex-col justify-center gap-8 grow text-center sm:text-left">
          <h1 className="uppercase text-4xl">{t('name')}</h1>
          <h2 className="uppercase font-light text-sm tracking-widest">
            {t('landing.job')}
          </h2>
        </div>
      </div>

      <Showcase />

      <div className="flex flex-col gap-4 m-8 items-center">
        <Button onClick={() => navigate('/prices')}>
          <HiOutlineCurrencyEuro />
          {t('landing.prices')}
        </Button>
        <Button onClick={() => navigate('/terms')}>
          <HiOutlineClipboardList />
          {t('landing.tos')}
        </Button>
        <a href="mailto:kumi.yada93@gmail.com">
          <Button>
            <HiOutlineMail />
            {t('landing.email-me')}
          </Button>
        </a>
      </div>

      <div className="flex flex-row justify-center gap-4 border-t p-8 border-zinc-100">
        {socialMedia.map((link) => (
          <SocialIcon
            target="_blank"
            key={link}
            className="border rounded-full hover:border-zinc-600 transition hover:-translate-y-2 duration-300"
            bgColor="transparent"
            fgColor="rgb(39 39 42 / var(--tw-bg-opacity))"
            style={{ width: '3.5em', height: '3.5em' }}
            url={link}
          />
        ))}
      </div>
    </>
  );
}

export default LandingPage;
