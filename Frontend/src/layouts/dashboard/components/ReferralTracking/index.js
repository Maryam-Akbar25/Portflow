import React from 'react';
import { Card } from '@mui/material';
import Box from 'components/Box';
import Typography from 'components/Typography';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';
import PortMapImage from 'assets/images/PortMap.png';

function PortMap() {
  const { gradients } = colors;
  const { cardDark } = gradients;

  return (
    <Card
      sx={{
        height: '100%',
        background: linearGradient(cardDark.main, cardDark.state, cardDark.deg),
        p: '24px'
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box mb='24px'>
          <Typography variant='lg' color='white' fontWeight='bold'>
            Live Port Map
          </Typography>
        </Box>

        <Box
          component='img'
          src={PortMapImage}
          alt='Live Port Map'
          width='100%'
          borderRadius='20px'
        />
      </Box>
    </Card>
  );
}

export default PortMap;
