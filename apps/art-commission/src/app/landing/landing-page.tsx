import { useTranslation } from 'react-i18next';
import { SocialIcon } from 'react-social-icons';
import { HiOutlineMail, HiOutlineClipboardList } from 'react-icons/hi';
import { Button } from '../components/link-button';
import Showcase from './showcase';
import { useState } from 'react';
import { Terms } from './terms';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  const { t } = useTranslation();

  const [showTerms, setShowTerms] = useState(false);

  const socialMedia = [
    'https://twitter.com/kumi_yada',
    'https://www.pixiv.net/users/58480310',
    // 'https://www.instagram.com/kumi_yada93',
    // 'https://www.youtube.com/channel/UCGhrMdAkUHi_8nc7qz_nE5Q',
    // 'https://kumi.fanbox.cc/',
  ];

  return (
    <>
      <div className="p-4 sm:p-16 flex flex-col sm:flex-row gap-8 sm:gap-16 mb-4">
        <img
          src="https://pbs.twimg.com/profile_images/1521508196518670338/KBUxFm5N_400x400.jpg"
          alt="profile"
          className="max-w-xs mx-auto rounded-full border"
        />
        <div className="flex flex-col justify-center gap-8 grow text-center sm:text-left">
          <h1 className="uppercase text-4xl">Kumi</h1>
          <h2 className="uppercase font-light text-sm tracking-widest">
            {t('landing.job')}
          </h2>
        </div>
      </div>

      <Showcase />

      <div className="flex flex-col gap-4 m-8 items-center">
        <a href="mailto:kumi.yada93@gmail.com">
          <Button>
            <HiOutlineMail />
            Email Me
          </Button>
        </a>
        <Button onClick={() => setShowTerms(true)}>
          <HiOutlineClipboardList />
          Terms of Service
        </Button>
      </div>

      <Terms open={showTerms} onClose={() => setShowTerms(false)} />

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
