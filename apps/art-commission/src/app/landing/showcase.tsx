import { useState } from 'react';
import ImageView from './image-view';

/* eslint-disable-next-line */
export interface ShowcaseProps {}

// Newer ones on top
const images = [
  'FVE4tF4XsAEUb8O',
  'FS0WGlSXEAI-8lM',
  'FQu1uPfXoAU4QEG',
  'FOzMp9eaUAE8DvK',
  'FLf6Eo_XsAcwd8R',
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
        key={i}
        className="overflow-hidden bg-cover w-1/2 h-50v md:h-25v cursor-pointer"
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
