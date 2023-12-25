import { FunctionComponent } from 'react';

type ButtonProps = {
  children?: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  onClick?: React.FormEventHandler<HTMLButtonElement>
};

const Button: FunctionComponent<ButtonProps> = ({
  children = 'Submit',
  primary,
  secondary,
  success,
  warning,
  danger,
  disabled,
  outline,
  rounded,
  onClick = (() => {})
}) => {
  let classes = `flex items-center px-3 py-1.5 border ${outline ? 'bg-white' : 'text-white'}${rounded && ' rounded-full'}`;
  if (primary) {
    classes += ` border-blue-500 ${outline ? 'text-blue-500' : 'bg-blue-500'}`;
  } else if (secondary) {
    classes += ` border-gray-900 ${outline ? 'text-gray-900' : 'bg-gray-900'}`;
  } else if (success) {
    classes += ` border-green-500 ${outline ? 'text-green-500' : 'bg-green-500'}`;
  } else if (warning) {
    classes += ` border-yellow-400 ${outline ? 'text-yellow-400' : 'bg-yellow-400'}`;
  } else if (danger) {
    classes += ` border-red-500 ${outline ? 'text-red-500' : 'bg-red-500'}`;
  } else {
    classes += ` border-black ${outline ? 'text-black' : 'bg-black'}`;
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

/*

    import type { FunctionComponent } from "react";
    import className from "classnames";
     
    type ExcludeFromTuple<T extends any[], U> = {
      [K in keyof T]: T[K] extends U ? never : T[K];
    }[number];
     
    type Exclusive<T extends PropertyKey[], U = any> = T[number] extends infer E
      ? E extends string
        ? Record<E, U> & { [k in ExcludeFromTuple<T, E>]?: never }
        : never
      : never & {};
     
    type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
      Partial<{
        outline?: boolean;
        rounded?: boolean;
      }> &
      Exclusive<["primary", "secondary", "success", "warning", "danger"], boolean>;
     
    const Button: FunctionComponent<ButtonProps> = ({
      children,
      primary,
      secondary,
      success,
      warning,
      danger,
      outline,
      rounded,
      ...rest
    }) => {
      const classes = className(
        rest.className,
        "flex items-center px-3 py-1.5 border",
        {
          "border-blue-500 bg-blue-500": primary,
          "border-gray-900 bg-gray-900": secondary,
          "border-green-500 bg-green-500": success,
          "border-yellow-400 bg-yellow-400": warning,
          "border-red-500 bg-red-500": danger,
          "rounded-full": rounded,
          "text-white":
            !outline && (primary || secondary || success || warning || danger),
          "bg-white": outline,
          "text-blue-500": outline && primary,
          "text-gray-500": outline && secondary,
          "text-green-500": outline && success,
          "text-yellow-500": outline && warning,
          "text-red-500": outline && danger,
        }
      );
     
      return (
        <button {...rest} className={classes}>
          {children}
        </button>
      );
    };
     
    export default Button;

*/
