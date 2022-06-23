const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AssetReminderModel = require('../models/assetReminder');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='reminder';

router.get('/asset/:asset/reminder', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetReminderModel(data,req.query);
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

router.get('/asset/:asset/reminder/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetReminderModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetProperties.asset)
        .input('id',sql.Int,assetProperties.id)
        .query(assetProperties.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});
router.post('/asset/:asset/reminder', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetReminderModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetProperties.asset)
        .input('date',sql.Date,assetProperties.date)        
        .input('description',sql.VarChar(100),assetProperties.description)
        .input('emailtoSend',sql.VarChar(100),assetProperties.emailtoSend)
        .query(assetProperties.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.log(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/asset/:asset/reminder/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetReminderModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('asset',sql.VarChar(8),assetProperties.asset)
        .input('id',sql.Int,assetProperties.id)
        .input('description',sql.VarChar(100),assetProperties.description)
        .input('date',sql.Date,assetProperties.date)    
        .input('emailtoSend',sql.VarChar(100),assetProperties.emailtoSend)
        .query(assetProperties.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/asset/:asset/reminder/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let assetProperties = AssetReminderModel(data,req.query);
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