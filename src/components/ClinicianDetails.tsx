import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NameDisplayConvention, NameDisplayPerson } from './NameDisplayConvention';

export interface ClinicianDetailsProps extends NameDisplayPerson {
  username: string;
  role: string;
}

export function ClinicianDetails(props: ClinicianDetailsProps): JSX.Element {
  return (
    <Box
      width="50%"
      display="flex"
      border="1px solid grey"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box>
        <Typography
          component="h2"
          variant="h3"
          sx={{
            textAlign: 'center'
          }}
        >
          <NameDisplayConvention {...props} />
        </Typography>
      </Box>
      <Box>
        <Typography
          component="h3"
          variant="h4"
        >
          {props.role}
        </Typography>
      </Box>
    </Box>
  )
}
