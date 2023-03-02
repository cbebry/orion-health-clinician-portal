import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { AuthenticationContext } from '../providers/Authentication';
import {
  apiGetClinicianDetails,
  apiGetPatients
} from '../api/ApplicationAPI';
import Typography from '@mui/material/Typography';
import {
  ClinicianDetailsProps, ClinicianDetails
} from '../components/ClinicianDetails';
import {
  PatientsDisplay
} from '../components/PatientsDisplay'

export default function ClinicianPortalPage(): JSX.Element {
  const { authData } = useContext(AuthenticationContext);

  const [clinician, setClinician] = useState<ClinicianDetailsProps>({
    username: '',
    role: '',
    firstName: '',
    familyName: ''
  });
  const [patients, setPatients] = useState({ patients: [] });

  useEffect(() => {
    async function getClinicianDetails() {
      const clinicianDetails = await apiGetClinicianDetails(authData.sessionToken);
      console.log('clinicianDetails', clinicianDetails);
      const resultBody = await clinicianDetails.json();
      console.log('clinicianDetails body', resultBody);
      setClinician(resultBody);
    }

    async function getPatients() {
      const patients = await apiGetPatients(authData.sessionToken);
      console.log('patients', patients);
      const resultBody = await patients.json();
      console.log('patients body', resultBody);
      setPatients(resultBody);
    }


    // In an ideal situation, we can launch these AJAX calls in parallel so they don't await in series
    getClinicianDetails();
    getPatients();
  }, []);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="stretch"
        margin="10px"
        height="200px"
      >
        <Box
          width="50%"
          display="flex"
          alignItems="center"
        >
          <Typography variant="h1">
            Clinical Portal
          </Typography>
        </Box>
        <ClinicianDetails {...clinician} />
      </Box>
      <Box>
        <PatientsDisplay {...patients}></PatientsDisplay>
      </Box>
    </Box>
  );
};
