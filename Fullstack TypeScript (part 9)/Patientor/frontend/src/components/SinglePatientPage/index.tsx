import { useParams } from 'react-router-dom'

const box = {
  border: "15px solid grey",
  padding: "20px",
  margin: "20px"
}

const EntryDetails = ({ entry, diagnoses }: any) => {
  switch (entry.type) {
    case "Hospital": {
      return (
        <div style={box}>
          {entry.date}, {entry.type}<br/>
          <i>{entry.description}</i><br/>
            {(entry.diagnosisCodes) &&
              <ul>
                {entry.diagnosisCodes.map((value: any) => 
                  <li key={value}>{value} {(diagnoses.find((element: { code: String }) => element.code === value)).name}</li>)}
              </ul>
            }
          Diagnose by: {entry.specialist}<br/>
          Discharge: {entry.discharge.date} <i>{entry.discharge.criteria}</i>
        </div>
      )
    }
    case "OccupationalHealthcare": {
      return (
        <div style={box}>
          {entry.date}, {entry.type}<br/>
          <i>{entry.description}</i><br/>
            {(entry.diagnosisCodes) &&
              <ul>
                {entry.diagnosisCodes.map((value: any) => 
                  <li key={value}>{value} {(diagnoses.find((element: { code: String }) => element.code === value)).name}</li>)}
              </ul>
            }
          Diagnose By: {entry.specialist}<br/>
          Employer Name: {entry.employerName}<br/>
          {(entry.SickLeave) &&
             <>Sickleave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</>
          }
        </div>
      )
    }
    case "HealthCheck": {
      return (
        <div style={box}>
          {entry.date}, {entry.type}<br/>
          <i>{entry.description}</i><br/>
          {(entry.diagnosisCodes) &&
              <ul>
                {entry.diagnosisCodes.map((value: any) => 
                  <li key={value}>{value} {(diagnoses.find((element: { code: String }) => element.code === value)).name}</li>)}
              </ul>
            }
          Diagnose By: {entry.specialist}<br/>
          Health Check Rating: {entry.healthCheckRating}
        </div>
      )
    }
    default: {
      return <></>
    }
  }
}

const SinglePatientPage = ({ patients, diagnoses }: any ) => {
  const id = useParams().id
  const patient = patients.find((value: { id: String }) => id === value.id)

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === 'male' && <> &#9794;</>}
        {patient.gender === 'female' && <> &#9792;</>}
        {patient.gender === 'other' && <> &#9895;</>}
      </h2>
      ssh: {patient.ssn}<br />
      occupation: {patient.occupation}
      <h3>entries</h3>
      {patient.entries.map((value: any) => <EntryDetails key={value.id} entry={value} diagnoses={diagnoses} />)}
    </div>
  )
} 

export default SinglePatientPage