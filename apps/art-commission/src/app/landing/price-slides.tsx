import { useState } from 'react';
import ImageView from './image-view';

interface PriceSlidesProps {
  price: string;
  images: string[];
}

export function PriceSlides({ price, images }: PriceSlidesProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imageToShow, setImageToShow] = useState('');

  return (
    <div className="py-4 flex flex-col">
      <span className="p-4 font-bold text-2xl">{price}</span>
      <div className="overflow-hidden w-full h-[30rem] flex relative">
        {images.map((i, idx) => (
          <div
            key={i}
            className="bg-contain bg-no-repeat grow absolute inset-0 transition-all ease-out duration-500"
            onClick={() => setImageToShow(i)}
            style={{
              backgroundImage: `url(${i})`,
              backgroundPosition: 'center center',
              transform: `translateX(${(idx - activeIdx) * 100}%)`,
            }}
          ></div>
        ))}
      </div>

      <div className="flex h-[5rem]">
        {images.map((i, idx) => (
          <button
            key={i}
            onClick={() => setActiveIdx(idx)}
            className="bg-cover grow"
            style={{
              backgroundImage: `url(${i})`,
              backgroundPosition: 'center center',
            }}
          ></button>
        ))}
      </div>

      <ImageView
        open={!!imageToShow}
        image={imageToShow}
        name={imageToShow}
        onClose={() => setImageToShow('')}
      />
    </div>
  );
}
