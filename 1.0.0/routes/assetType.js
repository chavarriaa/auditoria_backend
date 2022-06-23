const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AssetTypeModel = require('../models/assetType');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='asset-type';

router.get('/asset-type', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetType = AssetTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(assetType.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/asset-type/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let assetType = AssetTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetType.id)
        .query(assetType.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/asset-type', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetType = AssetTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('name',sql.NVarChar(40),assetType.name)
        .query(assetType.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/asset-type/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetType = AssetTypeModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetType.id)
        .input('name',sql.NVarChar(40),assetType.name)
        .query(assetType.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/asset-type/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetType = AssetTypeModel(data,req.query);
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