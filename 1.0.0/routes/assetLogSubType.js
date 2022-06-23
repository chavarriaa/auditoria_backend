const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AssetLogSubTypeModel = require('../models/assetLogSubType');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='asset-logsubtype';

router.get('/asset-logtype/:assetLogType/subtype', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogSubType = AssetLogSubTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('assetLogType',sql.Int,assetLogSubType.assetLogType)
        .query(assetLogSubType.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
 
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/asset-logtype/:assetLogType/subtype/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogSubType = AssetLogSubTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('assetLogType',sql.Int,assetLogSubType.assetLogType)
        .input('id',sql.Int,assetLogSubType.id)
        .query(assetLogSubType.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/asset-logtype/:assetLogType/subtype', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogSubType = AssetLogSubTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('assetLogType',sql.Int,assetLogSubType.assetLogType)
        .input('description',sql.VarChar(40),assetLogSubType.description)
        .query(assetLogSubType.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/asset-logtype/:assetLogType/subtype/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogSubType = AssetLogSubTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('assetLogType',sql.Int,assetLogSubType.assetLogType)
        .input('description',sql.VarChar(40),assetLogSubType.description)
        .input('id',sql.Int,assetLogSubType.id)
        .query(assetLogSubType.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/asset-logtype/:assetLogType/subtype/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogSubType = AssetLogSubTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetLogSubType.id)
        .query(assetLogSubType.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;