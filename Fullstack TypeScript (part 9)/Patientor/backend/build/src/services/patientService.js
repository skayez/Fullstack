"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientData_1 = __importDefault(require("../../data/patientData"));
const patients = patientData_1.default;
const patient = patientData_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const getPatient = (id) => {
    return patient.find((value) => value.id === id);
};
const addPatients = (entry) => {
    patients.push(entry);
    return entry;
};
exports.default = {
    getPatients,
    getPatient,
    addPatients
};
