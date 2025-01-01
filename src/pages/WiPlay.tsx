import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function WiPlay() {
  const [expanded, setExpanded] = useState<string>('none')

  const handleChange = (panelName: string) => {
    setExpanded(panelName === expanded ? 'none' : panelName)
  }

  return (
    <Box>
      <Accordion expanded={expanded === 'weight'} onChange={() => handleChange('weight')}>
        <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
          <Typography sx={{ width: '120px'}}>Weight</Typography>
          <Typography>Enter your weight</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>Last weight: 88 kg on June 23rd, 2024</Typography>
          <Button>New</Button> */}
          <Grid container spacing={0}>
            <Grid item xs={9}>
              <Typography sx={{ width: '80%'}}>Last weight: 88 kg on June 23rd, 2024</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'end' }}>
              <Button>New</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'pay'} onChange={() => handleChange('pay')}>
        <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
          <Typography sx={{ width: '120px'}}>Payment</Typography>
          <Typography>Enter payment amount and date</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>$ 10.00 paid on June 23rd, 2024</Typography>
          <Button>New</Button> */}
          <Grid container spacing={0}>
            <Grid item xs={9}>
              <Typography sx={{ width: '80%'}}>$ 10.00 paid on June 23rd, 2024</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'end' }}>
              <Button>New</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'vacation'} onChange={() => handleChange('vacation')}>
        <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
          <Typography sx={{ width: '120px'}}>Vacation</Typography>
          <Typography>Set your vacation start date</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={0}>
            <Grid item xs={9}>
              <Typography sx={{ width: '80%'}}>Vacation start: July 26th, 2024</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'end' }}>
              <Button>Set</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}