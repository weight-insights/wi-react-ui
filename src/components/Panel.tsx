import { FunctionComponent } from 'react';

type PanelProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: ((...arg: any) => void)
}

const Panel: FunctionComponent<PanelProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = `border rounded p-3 shadow bg-white w-full${className ? ' ' + className : ''}`;
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default Panel;
