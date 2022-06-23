const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AuditoryDiscoverTrackingModel = require('../models/AuditoryDiscoverTracking');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='AuditoryDiscoverTracking';

router.get('/auditory/:auditory/detail/:auditoryDetail/discover/:auditoryDiscover/detail', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoverDetail =  AuditoryDiscoverTrackingModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryDiscoverDetail.auditory)
        .input('auditoryDetail',sql.Int,auditoryDiscoverDetail.auditoryDetail)
        .input('auditoryDiscover',sql.Int,auditoryDiscoverDetail.auditoryDiscover)
        .query(auditoryDiscoverDetail.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/auditory/:auditory/detail/:auditoryDetail/discover/:auditoryDiscover/detail/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoverDetail =  AuditoryDiscoverTrackingModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryDiscoverDetail.auditory)
        .input('auditoryDetail',sql.Int,auditoryDiscoverDetail.auditoryDetail)
        .input('auditoryDiscover',sql.Int,auditoryDiscoverDetail.auditoryDiscover)
        .input('description',sql.VarChar(sql.MAX),auditoryDiscoverDetail.description)
        .query(auditoryDiscoverDetail.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.post('/auditory/:auditory/detail/:auditoryDetail/discover/:auditoryDiscover/detail', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoverDetail =  AuditoryDiscoverTrackingModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryDiscoverDetail.auditory)
        .input('auditoryDetail',sql.Int,auditoryDiscoverDetail.auditoryDetail)
        .input('auditoryDiscover',sql.Int,auditoryDiscoverDetail.auditoryDiscover)
        .input('description',sql.VarChar(sql.MAX),auditoryDiscoverDetail.description)
        .query(auditoryDiscoverDetail.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/auditory/:auditory/detail/:auditoryDetail/discover/:auditoryDiscover/detail/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoverDetail =  AuditoryDiscoverTrackingModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('auditory',sql.Int,auditoryDiscoverDetail.auditory)
        .input('auditoryDetail',sql.Int,auditoryDiscoverDetail.auditoryDetail)
        .input('auditoryDiscover',sql.Int,auditoryDiscoverDetail.auditoryDiscover)

        .input('description',sql.VarChar(sql.MAX),auditoryDiscoverDetail.description)
        .input('id',sql.Int,auditoryDiscoverDetail.id)
        
        .query(auditoryDiscoverDetail.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/auditory/:auditory/detail/:auditoryDetail/discover/:auditoryDiscover/detail/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryDiscoverDetail =  AuditoryDiscoverTrackingModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryDiscoverDetail.auditory)
        .input('auditoryDetail',sql.Int,auditoryDiscoverDetail.auditoryDetail)
        .input('auditoryDiscover',sql.Int,auditoryDiscoverDetail.auditoryDiscover)
        .input('id',sql.Int,auditoryDiscoverDetail.id)
        .query(auditoryDiscoverDetail.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;