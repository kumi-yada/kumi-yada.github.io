export interface ImageViewProps {
  image: string;
  open: boolean;
  name?: string;
  onClose: () => void;
}

export function ImageView({ image, open, name, onClose }: ImageViewProps) {
  const imageScale = open ? 'scale-100' : 'scale-90';
  const scale = open ? 'scale-100' : 'scale-0';
  const opacity = open ? 'opacity-100' : 'opacity-0';

  return (
    <div
      className={`flex backdrop-blur items-center fixed top-0 bottom-0 left-0 right-0 z-10 transition-opacity duration-300 ${scale} ${opacity}`}
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={() => onClose()}
    >
      <img
        src={image}
        alt={name}
        className={`max-h-75 mx-auto transition duration-300 ${imageScale}`}
      />
    </div>
  );
}

export default ImageView;
