import { useState } from 'react';
import ImageView from './image-view';
import { FadeInSection } from '../components/fade-in-section';

/* eslint-disable-next-line */
export interface ShowcaseProps {}

// Newer ones on top
const images = [
  'F0X8tAHWcAAKmnY',
  'FczL1PdXEAAz9Nz',
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
