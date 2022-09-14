export interface ImageViewProps {
  image: string;
  name?: string;
  onClose: () => void;
}

export function ImageView({ image, name, onClose }: ImageViewProps) {
  return (
    <div
      className="flex items-center fixed top-0 bottom-0 left-0 right-0 z-10"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={() => onClose()}
    >
      <img src={image} alt={name} className="max-h-75 mx-auto" />
    </div>
  );
}

export default ImageView;
