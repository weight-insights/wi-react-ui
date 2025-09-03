import WiMenu from '../components/WiMenu';
import { Box } from '@mui/material';
import { ReactElement } from 'react';


export default function Layout({children}:{children: ReactElement;}) {

  return (
    <Box sx={ { maxWidth: '800px', margin: 'auto' } }>
      <div>test Header</div>
      {children}
      <WiMenu />
    </Box>
  );
}
