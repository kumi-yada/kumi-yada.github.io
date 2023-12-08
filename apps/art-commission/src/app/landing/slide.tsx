interface SlideProps {
  image: string;
  className?: string;
}

export function Slide({ image, className }: SlideProps) {
  return (
    <div
      className={`bg-cover grow absolute inset-0 transition-all ease-out ${
        className ?? ''
      }`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center center',
      }}
    ></div>
  );
}
