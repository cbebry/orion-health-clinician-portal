import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { apiGetPatientDetails } from '../api/ApplicationAPI';
import { AuthenticationContext } from '../providers/Authentication';
import { NameDisplayConvention, NameDisplayPerson } from '../NameDisplayConvention';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


export interface PatientProps extends NameDisplayPerson {
  age: number;
  sex: 'Male' | 'Female' | 'Unknown' | 'Indeterminate';
}

interface PatientDetailsProps {
  index: number;
  chosenPatientIndex: number | boolean;
  id: string;
  name: string;
}

interface ProperlyAlignedBoxProps {
  children: JSX.Element
}

function ProperlyAlignedBox(props: ProperlyAlignedBoxProps) {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      paddingLeft="5px"
      width="25%"
    >
      {props.children}
    </Box>
  )
}

export default function PatientDetails(props: PatientDetailsProps): JSX.Element {
  const { authData } = useContext(AuthenticationContext);

  const [patientDetails, setPatientDetails] = useState<PatientProps>({
    firstName: '',
    familyName: '',
    age: 0,
    sex: 'Unknown'
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getPatientDetails(patientId: string) {
      console.log('getPatientDetails', authData.sessionToken, patientId);
      const patientDetails = await apiGetPatientDetails(authData.sessionToken, patientId);
      console.log('patientDetails', patientDetails);
      const resultBody = await patientDetails.json();
      console.log('patientDetails body', resultBody);
      setPatientDetails(resultBody);
      setIsLoaded(true);
    }

    if (props.id) {
      getPatientDetails(props.id);
    }
  }, []);


  return (
    <TabPanel value={props.chosenPatientIndex} index={props.index}>
      {
        isLoaded &&
          <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="400px"
          >
            <ProperlyAlignedBox>
              <NameDisplayConvention {...patientDetails} />
            </ProperlyAlignedBox>
            <ProperlyAlignedBox>
                <span>Age: {patientDetails.age}</span>
            </ProperlyAlignedBox>
            <ProperlyAlignedBox>
                <span>Sex: {patientDetails.sex}</span>
            </ProperlyAlignedBox>
          </Box>
      }
    </TabPanel>
  )
};
