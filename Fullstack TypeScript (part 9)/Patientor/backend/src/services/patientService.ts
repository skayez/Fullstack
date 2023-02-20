import patientData from '../../data/patientData'
import { PatientEntry, Patient } from '../types'

const patients: PatientEntry[] = patientData as unknown as PatientEntry[]
const patient: Patient[] = patientData as unknown as Patient[]

const getPatients = (): PatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
    id,
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation,
    entries
  }))
}

const getPatient = ( id: string ) => {
  return patient.find((value) => value.id === id)
}

const addPatients = ( entry: PatientEntry ): PatientEntry => {
  patients.push(entry)
  return entry
}

export default {
  getPatients,
  getPatient,
  addPatients
}