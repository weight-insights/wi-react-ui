import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { SxProps } from '@mui/material';

type WiButtonProps = {
  children?: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  to?: string;
  sx?: SxProps;
  onClick?: () => void;
};

export default function WiButton({
  children = 'Submit',
  variant = 'contained',
  to,
  sx,

  onClick,
}: WiButtonProps) {
  if (to) {
    return (
      <Button
        component={Link}
        to={to}
        variant={variant}
        sx={sx}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button variant={variant} sx={sx} onClick={onClick}>
      {children}
    </Button>
  );
}
