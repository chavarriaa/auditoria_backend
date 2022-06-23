const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AuditoryDetail = require('../models/auditoryDetail');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='auditoryDetail';

router.get('/auditory/:auditory/detail', async(req,res)=>{

    try {
        let data = {...req.body,...req.params}
        let auditoryDetail = AuditoryDetail(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryDetail.auditory)
        .query(auditoryDetail.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});



router.post('/auditory/:auditory/detail', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDetail = AuditoryDetail(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryDetail.auditory)
        .input('asset',sql.VarChar(8),auditoryDetail.asset)
        .input('description',sql.VarChar(100),auditoryDetail.description)
        .input('checked',sql.Bit,auditoryDetail.checked)
        .input('checkedDate',sql.Date,auditoryDetail.checkedDate)
        
        .query(auditoryDetail.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/auditory/:auditory/detail/:id', async(req,res)=>{

    try {

        let data = {...req.body,...req.params}
        console.log(req.body)
        let auditoryDetail = AuditoryDetail(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,auditoryDetail.id)
        .input('auditory',sql.Int,auditoryDetail.auditory)
        .input('asset',sql.VarChar(8),auditoryDetail.asset)
        .input('checked',sql.Bit,auditoryDetail.checked)
        .input('checkedDate',sql.Date,auditoryDetail.checkedDate)
        .query(auditoryDetail.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/auditory/:auditory/detail/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDetail = AuditoryDetail(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryDetail.auditory)
        .input('id',sql.Int,auditoryDetail.id)
        .query(auditoryDetail.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

module.exports = router;