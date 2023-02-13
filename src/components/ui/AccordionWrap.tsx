import { ReactNode, useMemo, useState } from 'react';

import { ExpandMoreOutlined } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Stack,
  Typography,
} from '@mui/material';

import { StatusLine } from './StatusLine';
import { formatDate } from 'components/libs/helpers';

export function AccordionWrap({ date, children }: { date: Date; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const dateLabel = useMemo(() => formatDate(date), [date]);

  return (
    <Card
      elevation={16}
      sx={{
        margin: '15px 0',
        width: '100%',
        borderRadius: '20px',
      }}
    >
      <Accordion expanded={expanded} sx={{ bgcolor: 'primary.light' }} onClick={toggleExpanded}>
        {/* summary */}
        <AccordionSummary>
          <Stack width={'100%'} direction='row' alignItems='center'>
            <StatusLine color='gray' />
            <Typography ml={2} variant='subtitle1'>
              {dateLabel}
            </Typography>
            <Box sx={{ borderRadius: '50%', display: 'flex' }} ml='auto'>
              <ExpandMoreOutlined
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'primary.main',
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                  transform: expanded ? 'rotate(-90deg)' : 'rotate(0)',
                  transition: 'transform .2s linear',
                }}
              />
            </Box>
          </Stack>
        </AccordionSummary>
        {/* details */}
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Card>
  );
}