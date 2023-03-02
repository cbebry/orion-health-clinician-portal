import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PatientDetails from './PatientDetails';

export interface PatientsDisplayProps {
  patients: PatientIndex[]
}

export interface PatientIndex {
  id: string;
  name: string;
}

// major "props" to https://mui.com/material-ui/react-tabs/
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function PatientsDisplay(props: PatientsDisplayProps): JSX.Element {
  console.log('PatientsDisplay props', props);

  const [chosenPatientIndex, setChosenPatientIndex] = useState<number | boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newChosenPatientIndex: number | boolean) => {
    setChosenPatientIndex(newChosenPatientIndex);
  };

  return (
    <Box
      margin="10px"
      border="1px solid grey"
      height="600px"
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={chosenPatientIndex} variant="fullWidth" onChange={handleChange} aria-label="Patients List">
          {
            props.patients.map((patientIndex, index) =>
              (<Tab key={patientIndex.id} label={`${patientIndex.name} (${patientIndex.id})`} {...a11yProps(index)} />)
            )
          }
        </Tabs>
      </Box>
      {chosenPatientIndex !== false &&
        props.patients.map((patientIndex, index) =>
        {
          return chosenPatientIndex === index &&
            (<PatientDetails
              key={patientIndex.id}
              {...{ index, id: patientIndex.id, name: patientIndex.name, chosenPatientIndex } }
            />)
        }
        )
      }
    </Box>
  );
}