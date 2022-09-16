import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="rounded-full bg-zinc-800 text-white px-8 py-4 tracking-widest flex flex-row items-center gap-4 font-light uppercase text-sm transition hover:scale-95 hover:opacity-90 duration-300"
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
}
