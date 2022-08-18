import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

interface LinkButtonProps extends PropsWithChildren {
  to: string;
}

export function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className="rounded-full bg-slate-300 border px-4 py-2 flex flex-row items-center gap-4"
    >
      {children}
      <FaArrowRight />
    </Link>
  );
}
