import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { AuthenticationContext } from '../providers/Authentication';
import {
  apiGetClinicianDetails,
  apiGetPatients
} from '../api/ApplicationAPI';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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
  const [clinicianIsLoading, setClinicianIsLoading] = useState(false);
  const [patientListIsLoading, setPatientListIsLoading] = useState(false);

  useEffect(() => {
    async function getClinicianDetails() {
      setClinicianIsLoading(true);
      const clinicianDetails = await apiGetClinicianDetails(authData.sessionToken);
      const resultBody = await clinicianDetails.json();
      setClinician(resultBody);
      setClinicianIsLoading(false);
    }

    async function getPatients() {
      setPatientListIsLoading(true);
      const patients = await apiGetPatients(authData.sessionToken);
      const resultBody = await patients.json();
      setPatients(resultBody);
      setPatientListIsLoading(false);
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
      <Backdrop
        sx={{ color: '#fff' }}
        open={clinicianIsLoading || patientListIsLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
