import diagnoseData from '../../data/diagnoseData'

interface DiagnoseEntry {
  code: String
  name: String
  latin?: String
}

const diagnoses: DiagnoseEntry[] = diagnoseData

const getDiagnoses = () => {
  return diagnoses
}

export default {
  getDiagnoses
}