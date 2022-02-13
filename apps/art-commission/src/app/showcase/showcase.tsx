import { useState } from 'react';
import ImageView from '../image-view/image-view';
import './showcase.module.scss';

/* eslint-disable-next-line */
export interface ShowcaseProps {}

// Newer ones on top
const images = [
  'FK3PC2FWUAMGbSq',
  'FH4fX3IXoAQ5yQk',
  'FFnvByfWUA0H2N8',
  'FAglt8QXMAU64nw',
];

const createImgUrl = (id: string, small = true) =>
  `https://pbs.twimg.com/media/${id}?format=jpg&name=${
    small ? 'small' : 'large'
  }`;

export function Showcase(props: ShowcaseProps) {
  const [imageToShow, setImageToShow] = useState('');

  const showcase = images.map((i) => {
    const url = createImgUrl(i);
    return (
      <div
        className="overflow-hidden bg-cover w-1/2 md:w-1/4 h-50v md:h-25v"
        style={{
          backgroundImage: `url(${url})`,
          backgroundPosition: 'center 25%',
        }}
        onClick={() => setImageToShow(i)}
      ></div>
    );
  });

  return (
    <>
      {imageToShow && (
        <ImageView
          image={createImgUrl(imageToShow, false)}
          name={imageToShow}
          onClose={() => setImageToShow('')}
        />
      )}
      <div className="flex flex-wrap">{showcase}</div>
    </>
  );
}

export default Showcase;
