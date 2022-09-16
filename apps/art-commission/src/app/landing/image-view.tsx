import Modal from '../components/modal';

export interface ImageViewProps {
  image: string;
  open: boolean;
  name?: string;
  onClose: () => void;
}

export function ImageView({ image, open, name, onClose }: ImageViewProps) {
  const imageScale = open ? 'scale-100' : 'scale-90';

  return (
    <Modal open={open} onClose={onClose}>
      <img
        src={image}
        alt={name}
        className={`max-h-75 mx-auto transition duration-300 ${imageScale}`}
      />
    </Modal>
  );
}

export default ImageView;
