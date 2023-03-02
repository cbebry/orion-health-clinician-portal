
export async function apiLogin(username: string, password: string): Promise<Response>  {
  const basicAuthString: string = btoa(`${username}:${password}`);
  const result = await fetch('/login', {
    method: 'POST',
    headers: new Headers({
      'Authorization': `Basic ${basicAuthString}`
    })
  });
  return result;
}

export async function apiGetClinicianDetails(sessionToken: string): Promise<Response>  {
  const result = await fetch('/clinician-details', {
    method: 'GET',
    headers: new Headers({
      'Authorization': sessionToken
    })
  });
  return result;
}

export async function apiGetPatients(sessionToken: string): Promise<Response>  {
  const result = await fetch('/patients', {
    method: 'GET',
    headers: new Headers({
      'Authorization': sessionToken
    })
  });
  return result;
}

export async function apiGetPatientDetails(sessionToken: string, patientId: string): Promise<Response>  {
  const result = await fetch(`/patient-details/${patientId}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': sessionToken
    })
  });
  return result;
}
