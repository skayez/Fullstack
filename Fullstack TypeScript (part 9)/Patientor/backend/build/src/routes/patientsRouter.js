"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    res.send(patientService_1.default.getPatient(req.params.id));
});
router.post('/', (req, res) => {
    try {
        const id = (0, uuid_1.v1)();
        const newEntry = (0, utils_1.default)(Object.assign(Object.assign({}, req.body), { id: id }));
        const validatedEntry = (0, utils_1.default)(newEntry);
        patientService_1.default.addPatients(validatedEntry);
        res.json(newEntry);
    }
    catch (error) {
        res.status(400).send('Something went wrong :(');
    }
});
exports.default = router;
