import { useTranslation } from 'react-i18next';
import { SocialIcon } from 'react-social-icons';
import {
  HiOutlineMail,
  HiOutlineClipboardList,
  HiOutlineCurrencyEuro,
} from 'react-icons/hi';
import { Button } from '../components/link-button';
import Showcase from './showcase';
import { useEffect, useState } from 'react';

const LANG_KEY = 'kumi-yada.lang';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(
    localStorage.getItem(LANG_KEY) ?? navigator.language.split('-')[0]
  );
  const [langOpen, setLangOpen] = useState(false);

  const LANGS = ['en', 'ja'];
  const socialMedia = [
    'https://www.pixiv.net/users/58480310',
    'https://bsky.app/profile/kumiyada.bsky.social',
    'https://twitter.com/kumi_yada',
    // 'https://www.instagram.com/kumi_yada93',
  ];

  document.addEventListener('click', () => setLangOpen(false));

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  return (
    <>
      <div
        className={`fade-container p-2 flex gap-4 justify-end w-full text-sm absolute ${
          langOpen ? 'open' : ''
        }`}
      >
        <button
          className="p-2 text-slate-400"
          onClick={(e) => {
            setLangOpen(!langOpen);
            e.stopPropagation();
          }}
        >
          {t(lang)}
        </button>
        <div className="flex gap-2 fade-in absolute right-16 whitespace-nowrap">
          {LANGS.filter((l) => l !== lang).map((l) => (
            <button key={l} className="p-2" onClick={() => setLang(l)}>
              {t(l)}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-16 flex flex-col sm:flex-row gap-8 sm:gap-16 mb-4">
        <img
          src="/assets/profile.png"
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
        {/* <Button onClick={() => navigate('/prices')}>
          <HiOutlineCurrencyEuro />
          {t('landing.prices')}
        </Button>
        <Button onClick={() => navigate('/terms')}>
          <HiOutlineClipboardList />
          {t('landing.tos')}
        </Button> */}
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
