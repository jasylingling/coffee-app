import { ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
  minWidth?: boolean;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, variant, onClick, disabled, minWidth }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'mr-3 mt-2 flex w-full items-center justify-center rounded-lg px-6 py-[0.625rem] text-sm font-medium leading-relaxed tracking-wide hover:opacity-80 min-[500px]:w-fit',
        {
          'bg-brown-primary text-lightbeige-accent': variant === 'primary',
          'border-2 border-brown-primary text-brown-primary': variant === 'secondary',
          'text-red-danger underline decoration-2 underline-offset-4': variant === 'tertiary',
          'bg-red-danger text-lightgrey-bg': variant === 'danger',
          'cursor-progress opacity-80': disabled,
          'min-[500px]:!w-24': minWidth,
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
