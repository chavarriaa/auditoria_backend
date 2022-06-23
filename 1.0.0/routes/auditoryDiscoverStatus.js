const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AuditoryDiscoverStatus = require('../models/auditoryDiscoverStatus');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='auditoryDiscoveryStatus';

router.get('/auditory-discovery-status', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoveryStatus = AuditoryDiscoverStatus(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,auditoryDiscoveryStatus.area)
        .query(auditoryDiscoveryStatus.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/auditory-discovery-status/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoveryStatus = AuditoryDiscoverStatus(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,auditoryDiscoveryStatus.id)
        .query(auditoryDiscoveryStatus.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/auditory-discovery-status', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoveryStatus = AuditoryDiscoverStatus(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,auditoryDiscoveryStatus.area)
        .input('name',sql.NVarChar(40),auditoryDiscoveryStatus.name)
        .query(auditoryDiscoveryStatus.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/auditory-discovery-status/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoveryStatus = AuditoryDiscoverStatus(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('area',sql.Int,auditoryDiscoveryStatus.area)
        .input('id',sql.Int,auditoryDiscoveryStatus.id)
        .input('name',sql.NVarChar(40),auditoryDiscoveryStatus.name)
        .query(auditoryDiscoveryStatus.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/auditory-discovery-status/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoveryStatus = AuditoryDiscoverStatus(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,auditoryDiscoveryStatus.area)
        .input('id',sql.Int,auditoryDiscoveryStatus.id)
        .query(auditoryDiscoveryStatus.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

module.exports = router;