const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AssetLogModel = require('../models/assetLog');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='assetLog';

router.get('/asset/:asset/log', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLog = AssetLogModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetLog.asset)
        .query(assetLog.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/asset/:asset/log/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLog = AssetLogModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetLog.asset)
        .input('id',sql.Int,assetLog.id)
        .query(assetLog.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/asset/:asset/log', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLog = AssetLogModel(data,req.query);
        let pool = await sql.connect(config);
        console.log(data)
        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetLog.asset)
        .input('date',sql.Date,assetLog.date)
        .input('type',sql.Int,assetLog.type)
        .input('subtype',sql.Int,assetLog.subtype)
        .input('description',sql.VarChar(sql.MAX),assetLog.description)
        .input('cost',sql.Decimal(12,2),assetLog.cost)
        .input('capitalize',sql.Bit,assetLog.capitalize)
        .query(assetLog.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.log(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/asset/:asset/log/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLog = AssetLogModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetLog.asset)
        .input('date',sql.Date,assetLog.date)
        .input('type',sql.Int,assetLog.type)
        .input('subtype',sql.Int,assetLog.subtype)
        .input('description',sql.VarChar(sql.MAX),assetLog.description)
        .input('cost',sql.Decimal(12,2),assetLog.cost)
        .query(assetLog.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/asset/:asset/log/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetLog = AssetLogModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('asset',sql.Int,assetLog.asset)
        .input('id',sql.Int,assetLog.id)
        .query(assetLog.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;