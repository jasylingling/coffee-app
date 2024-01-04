import { FC, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'tertiary';
};

const Button: FC<ButtonProps> = ({ children, variant, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'mb-6 mr-8 flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-medium leading-relaxed tracking-wide hover:opacity-80 min-[500px]:w-auto',
        {
          'bg-brown-primary text-lightbeige-accent': variant === 'primary',
          'border-brown-primary text-brown-primary border-2': variant === 'secondary',
          'text-red-delete underline decoration-2 underline-offset-4': variant === 'tertiary',
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
