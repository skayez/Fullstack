"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseId = (id) => {
    if (!id || typeof id !== 'string') {
        throw new Error('You idiot, "id" is missing or incorrect');
    }
    return id;
};
const parseName = (name) => {
    if (!name || typeof name !== 'string') {
        throw new Error('Fuck, "name" is missing or incorrect');
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || typeof dateOfBirth !== 'string' || !(Date.parse(dateOfBirth))) {
        throw new Error('Jesus Christ, "dateOfBirth" is missing or incorrect');
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || typeof ssn !== 'string') {
        throw new Error('What is this shit, "ssn" is missing or incorrect');
    }
    return ssn;
};
const parseGender = (gender) => {
    const imBORED = (str) => {
        return ['male', 'female', 'other'].includes(str);
    };
    if (!gender || typeof gender !== 'string' || !imBORED(gender)) {
        throw new Error('You son of bitch, "gender" is missing or incorrect');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || typeof occupation !== 'string') {
        throw new Error('Damn, "occupation" is missing or incorrect');
    }
    return occupation;
};
const toNewPatientEntry = (object) => {
    if ('id' in object && 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newEntry = {
            id: parseId(object.id),
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: object.entries
        };
        return newEntry;
    }
    throw new Error('some of the fields are missing');
};
exports.default = toNewPatientEntry;
