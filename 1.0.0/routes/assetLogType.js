const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AssetLogTypeModel = require('../models/assetLogType');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='asset-logtype';

router.get('/asset-logtype', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogType = AssetLogTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(assetLogType.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/asset-logtype/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogType = AssetLogTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetLogType.id)
        .query(assetLogType.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/asset-logtype', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogType = AssetLogTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('description',sql.VarChar(40),assetLogType.description)
        .query(assetLogType.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/asset-logtype/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogType = AssetLogTypeModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('id',sql.Int,assetLogType.id)
        .input('description',sql.VarChar(40),assetLogType.description)
        .query(assetLogType.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/asset-logtype/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLogType = AssetLogTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetLogType.id)
        .query(assetLogType.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;