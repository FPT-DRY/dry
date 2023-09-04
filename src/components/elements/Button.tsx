import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?:
    | 'primary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-success'
    | 'outline-primary';
  square?: boolean;
  fullSize?: boolean;
  paddingLess?: boolean;
}

const Button = ({
  className,
  children,
  variant,
  square,
  fullSize,
  paddingLess,
  type = 'button',
  ...props
}: ButtonProps) => {
  const getVariant = () => {
    switch (variant) {
      case 'primary':
        return 'bg-violet-500 hover:bg-violet-700 text-white';
      case 'danger':
        return 'bg-red-500 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-green-500 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-700 text-white';
      default:
        return 'bg-transparent text-white';
    }
  };
  return (
    <button
      {...props}
      type={type}
      className={`
        ${fullSize ? 'min-w-full' : 'min-w-max'}
        ${getVariant()} transition duration-500  ${
          !paddingLess && 'py-2 px-4'
        }  ${!square && 'rounded-md'} active:scale-95 ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
