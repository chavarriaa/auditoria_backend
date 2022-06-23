const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AuditoryDiscoverModel = require('../models/AuditoryDiscover');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='AuditoryDiscover';

router.get('/auditory/:auditory/discover', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let AuditoryDiscover =  AuditoryDiscoverModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,AuditoryDiscover.auditory)
      
        .query(AuditoryDiscover.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/auditory/:auditory/discover', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let AuditoryDiscover =  AuditoryDiscoverModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,AuditoryDiscover.auditory)
      
        .input('id',sql.Int,AuditoryDiscover.id)
        .query(AuditoryDiscover.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.post('/auditory/:auditory/discover', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let AuditoryDiscover =  AuditoryDiscoverModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,AuditoryDiscover.auditory)
        .input('asset',sql.VarChar(8),AuditoryDiscover.asset)
        .input('description',sql.VarChar(100),AuditoryDiscover.description)
        .input('auditor',sql.VarChar(100),AuditoryDiscover.auditor)
        .input('status',sql.Int,AuditoryDiscover.status)
        
        .query(AuditoryDiscover.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
console.log(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/auditory/:auditory/discover/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let AuditoryDiscover =  AuditoryDiscoverModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('auditory',sql.Int,AuditoryDiscover.auditory)
      
        .input('auditoryDiscover',sql.Int,AuditoryDiscover.auditoryDiscover)
        .input('asset',sql.VarChar(8),AuditoryDiscover.asset)
        .input('description',sql.VarChar(100),AuditoryDiscover.description)
        .input('id',sql.Int,AuditoryDiscover.id)
        
        .query(AuditoryDiscover.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/auditory/:auditory/discover/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let AuditoryDiscover =  AuditoryDiscoverModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,AuditoryDiscover.auditory)
      
        .input('auditoryDiscover',sql.Int,AuditoryDiscover.auditoryDiscover)
        .input('id',sql.Int,AuditoryDiscover.id)
        .query(AuditoryDiscover.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;