import { PropsWithChildren } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CardHeaderProps extends PropsWithChildren {
  backTo: string;
}

export function CardHeader({ children, backTo }: CardHeaderProps) {
  return (
    <Link
      to={backTo}
      className="border-y font-bold flex flex-row gap-4 items-center"
    >
      <div className="p-4">
        <FaArrowLeft />
      </div>
      {children}
    </Link>
  );
}
