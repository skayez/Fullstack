import express from 'express';
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'
import { v1 as uuid } from 'uuid'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getPatients())
})

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id))
})

router.post('/', (req, res) => {
  try {
    const id = uuid()
    const newEntry = toNewPatientEntry({ ...req.body, id: id })
    const validatedEntry = toNewPatientEntry(newEntry)
    patientService.addPatients(validatedEntry)
    res.json(newEntry)
  } catch (error: unknown) {
    res.status(400).send('Something went wrong :(')
  }
})

export default router
