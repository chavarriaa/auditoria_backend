const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AssetStatusModel = require('../models/assetStatus');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='assetStatus';

router.get('/asset-status', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetStatus = AssetStatusModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,assetStatus.area)
        .query(assetStatus.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('asset-status/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let assetStatus = AssetStatusModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,assetStatus.area)
        .input('id',sql.Int,assetStatus.id)
        .query(assetStatus.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/asset-status', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetStatus = AssetStatusModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,assetStatus.area)
        .input('name',sql.NVarChar(40),assetStatus.name)
        .query(assetStatus.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/asset-status/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetStatus = AssetStatusModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('area',sql.Int,assetStatus.area)
        .input('id',sql.Int,assetStatus.id)
        .input('name',sql.NVarChar(40),assetStatus.name)
        .query(assetStatus.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/asset-status/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetStatus = AssetStatusModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,assetStatus.area)
        .input('id',sql.Int,assetStatus.id)
        .query(assetStatus.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

module.exports = router;