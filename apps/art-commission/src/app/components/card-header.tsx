import { PropsWithChildren } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CardHeaderProps extends PropsWithChildren {
  backTo: string;
}

export function CardHeader({ children, backTo }: CardHeaderProps) {
  return (
    <div className="border-y font-bold flex flex-row gap-4 items-center">
      <Link to={backTo} className="p-4">
        <FaArrowLeft />
      </Link>
      {children}
    </div>
  );
}
