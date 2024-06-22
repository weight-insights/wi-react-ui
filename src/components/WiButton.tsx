// import * as React from 'react';
import Button from '@mui/material/Button';

type WiButtonProps = {
  children?: React.ReactNode,
  variant?: 'contained' | 'outlined' | 'text'
}

export default function WiButton({children = 'Submit', variant = 'contained'}: WiButtonProps) {
  console.log(variant);
  return <Button variant={variant}>{ children }</Button>;
}
