import { useState } from 'react';
import ImageView from './image-view';
import { FadeInSection } from '../components/fade-in-section';

/* eslint-disable-next-line */
export interface ShowcaseProps {}

// Newer ones on top
const images = [
  'gxoz3yp44zy2brjbzlsopxcm/bafkreibeqkrhhq5nxuz73ldh2lpiq76e4our24jibk3sd6jw2n6ryrdm4e',
  'gxoz3yp44zy2brjbzlsopxcm/bafkreicp44mh6fp7odzwgijx3dqvwktela2u52ryp24btnrlcwpxcrxfca',
  'gxoz3yp44zy2brjbzlsopxcm/bafkreiclfdfxj6poyuuoi4ftr3esz6lo74dv6tgoyxwnxcoarnz56e6tk4',
  'gxoz3yp44zy2brjbzlsopxcm/bafkreihrnpphj3c7suitrji2rl7t2a3gxnitunjaqivhrdhcxrs343bm5i',
  'gxoz3yp44zy2brjbzlsopxcm/bafkreiamttvsx5twdbi4v5idsw2jkv4b5dzfiossf3feqcmnirada4wqqq',
  'gxoz3yp44zy2brjbzlsopxcm/bafkreig5ugg3vmu7ysy3atsznee4yyamid4asbdmzmhrapj6hgxccqs72y',
  'F0X8tAHWcAAKmnY',
  'FczL1PdXEAAz9Nz',
];

const createImgUrl = (id: string, small = true) =>
  id.length < 30 ? createTwImgUrl(id, small) : createBskyImgUrl(id, small);

const createTwImgUrl = (id: string, small = true) =>
  `https://pbs.twimg.com/media/${id}?format=jpg&name=${
    small ? 'small' : 'large'
  }`;

const createBskyImgUrl = (id: string, small = true) =>
  `https://cdn.bsky.app/img/feed_${
    small ? 'thumbnail' : 'fullsize'
  }/plain/did:plc:${id}@jpeg`;

export function Showcase(props: ShowcaseProps) {
  const [imageToShow, setImageToShow] = useState('');

  const showcase = images.map((i) => {
    const url = createImgUrl(i);
    return (
      <div
        key={i}
        className="overflow-hidden w-full sm:h-50v sm:w-1/2 h-75v max-h-[25rem] cursor-pointer flex"
        onClick={() => setImageToShow(i)}
      >
        <FadeInSection>
          <div
            className="bg-cover grow hover:scale-110 transition-transform duration-300"
            style={{
              backgroundImage: `url(${url})`,
              backgroundPosition: 'center center',
            }}
          ></div>
        </FadeInSection>
      </div>
    );
  });

  return (
    <>
      <ImageView
        open={!!imageToShow}
        image={createImgUrl(imageToShow, false)}
        name={imageToShow}
        onClose={() => setImageToShow('')}
      />
      <div className="flex flex-wrap">{showcase}</div>
    </>
  );
}

export default Showcase;
