import { PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export function Modal({ open, children, onClose }: ModalProps) {
  const opacity = open ? 'opacity-100' : 'opacity-0';
  const scale = open ? 'scale-100' : 'scale-0';

  return (
    <div
      className={`flex backdrop-blur items-center justify-center fixed top-0 bottom-0 left-0 right-0 z-10 transition-opacity duration-300 ${scale} ${opacity}`}
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={() => onClose()}
    >
      {children}
    </div>
  );
}

export default Modal;
