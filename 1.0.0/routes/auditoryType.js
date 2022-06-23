const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AuditoryTypeModel = require('../models/auditoryType');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='auditory-type';

router.get('/auditory-type', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetType = AuditoryTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(assetType.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/auditory-type/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let assetType = AuditoryTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetType.id)
        .query(assetType.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/auditory-type', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetType = AuditoryTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('description',sql.NVarChar(40),assetType.description)
        .query(assetType.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/auditory-type/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetType = AuditoryTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetType.id)
        .input('description',sql.NVarChar(40),assetType.description)
        .query(assetType.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/auditory-type/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetType = AuditoryTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetType.id)
        .query(assetType.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;