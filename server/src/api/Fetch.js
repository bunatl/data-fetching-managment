const express = require('express');
const router = express.Router();

const {
    company,
    employees,
    departments
} = require('../staticDB/db');


router.get('/company', (req, res, next) => {
    res.status(200);
    res.json(company);
});

router.get('/departments', (req, res, next) => {
    res.status(200);
    res.json(departments);
});

router.get('/employees', (req, res, next) => {
    res.status(200);
    res.json(employees);
});

module.exports = router;
