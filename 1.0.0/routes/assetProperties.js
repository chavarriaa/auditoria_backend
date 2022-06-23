const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AssetPropertiesModel = require('../models/assetProperties');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='asset-logtype';

router.get('/asset/:asset/properties', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetPropertiesModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetProperties.asset)
        .query(assetProperties.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/asset/:asset/properties/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetPropertiesModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,assetProperties.id)
        .input('asset',sql.VarChar(8),assetProperties.asset)
        .input('property',sql.VarChar(100),assetProperties.property)
        .query(assetProperties.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/asset/:asset/properties', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetPropertiesModel(data,req.query);
        let pool = await sql.connect(config);
        
        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetProperties.asset)
        .input('property',sql.VarChar(100),assetProperties.property)
        .input('description',sql.VarChar(100),assetProperties.description)
        .query(assetProperties.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.log(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/asset/:asset/properties/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetPropertiesModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('id',sql.Int,assetProperties.id)
        .input('asset',sql.VarChar(8),assetProperties.asset)
        .input('property',sql.VarChar(100),assetProperties.property)
        .input('description',sql.VarChar(100),assetProperties.description)
        .query(assetProperties.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/asset/:asset/properties/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetPropertiesModel(data,req.query);
        console.log(req.url)
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetProperties.asset)
        .input('id',sql.Int,assetProperties.id)
        .query(assetProperties.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;