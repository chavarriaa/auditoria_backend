const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const Auditory = require('../models/auditory');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='auditory';

router.get('/auditory', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditory = Auditory(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(auditory.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/auditory/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditory = Auditory(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,auditory.id)
        .query(auditory.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/auditory', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditory = Auditory(data,req.query);
        let pool = await sql.connect(config);
        console.log(data)
        let response = await pool.request()
        .input('startDate',sql.Date,Date(auditory.startDate))
        .input('endDate',sql.Date,Date(auditory.endDate))        
        .input('description',sql.VarChar(sql.MAX),auditory.description)
        .input('auditor',sql.VarChar(100),auditory.auditor)
        .input('type',sql.Int,auditory.type)
        .query(auditory.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
        console.log(response.recordsets[0])
    } catch (e) {
        console.log(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/auditory/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditory = Auditory(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('id',sql.Int,auditory.id)
        .input('startDate',sql.Date,auditory.startDate)
        .input('endDate',sql.Date,auditory.endDate)        
        .input('description',sql.VarChar(MAX),auditory.description)
        .input('auditor',sql.VarChar(100),auditory.auditor)
        .input('type',sql.Int,auditory.type)
        .query(auditory.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/auditory/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditory = Auditory(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,auditory.id)
        .query(auditory.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

module.exports = router;