export type excludeSsn = Omit<PatientEntry, 'ssn'>

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

/*
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}*/

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'Other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

interface SickLeave {
  startDate: string
  endDate: string
}

interface Discharge {
  date: string
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry
}
