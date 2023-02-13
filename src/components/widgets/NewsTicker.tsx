import { useQuery } from 'react-query';
import { Box, Card } from '@mui/material';

import { getNews } from 'components/libs/api';
import { Marquee } from 'components/ui/marquee';

const FALLBACK_TEXT = 'oops... something went wrong';

function NewsTicker() {
  const { data, isFetching, error } = useQuery('news', getNews, {
    retry: 3,
    retryDelay: 1500,
  });

  if (error) return <Marquee>{FALLBACK_TEXT}</Marquee>;

  return (
    <Card
      sx={{
        color: 'primary.contrastText',
        bgcolor: 'primary.main',
        fontSize: 22,
      }}
      elevation={24}
    >
      <Marquee>
        {isFetching ? 'loading...' : data?.news}
        <p style={{ opacity: 0 }}>Lorem ipsum dolor sit amet consectetur ad</p>
      </Marquee>
    </Card>
  );
}

export default NewsTicker;