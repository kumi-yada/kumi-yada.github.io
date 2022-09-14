import { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ButtonProps extends PropsWithChildren {}

export function Button({ children }: ButtonProps) {
  return (
    <button className="rounded-full bg-zinc-800 text-white px-8 py-4 tracking-widest flex flex-row items-center gap-4 font-light uppercase text-sm transition hover:scale-95 hover:opacity-90 duration-300">
      {children}
    </button>
  );
}
