const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AuditoryAssetTypeSelect = require('../models/auditoryAssetTypeSelect');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='auditory-assetTypeSelection';

router.get('/auditory/:auditory/asset-type-select/', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryAssetTypeSelect = AuditoryAssetTypeSelect(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryAssetTypeSelect.auditory)
        .query(auditoryAssetTypeSelect.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/auditory/:auditory/asset-type-select/:assetType', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let auditoryAssetTypeSelect = AuditoryAssetTypeSelect(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryAssetTypeSelect.auditory)
        .input('assetType',sql.Int,auditoryAssetTypeSelect.assetType)
        .query(auditoryAssetTypeSelect.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/auditory/:auditory/asset-type-select', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryAssetTypeSelect = AuditoryAssetTypeSelect(data,req.query);

        let newRegisters = data.data.map((item)=>(`(${item.auditory},${item.assetType})`)).join(',')
        let pool = await sql.connect(config)

        let deleteAllDetail = await pool.request()
        .query(`DELETE FROM AuditoryDetail where auditory = ' `+auditoryAssetTypeSelect.auditory+`'`);

        let deleteSelectedRegisters = await pool.request()
        .input('auditory',sql.Int,auditoryAssetTypeSelect.auditory)
        .query(auditoryAssetTypeSelect.delete);
        
         let InsertsRegisters = await pool.request()
        .query(auditoryAssetTypeSelect.load + newRegisters);
        
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryAssetTypeSelect.auditory)
        .query(auditoryAssetTypeSelect.getAssetsFromAuditory)
        let value = response.recordsets[0]

        let assetsIds = value.map((item)=>(`(${auditoryAssetTypeSelect.auditory},'${item.id}',${'0'})`)).join(',')
 
        let finalmente =await pool.request()
        .query(auditoryAssetTypeSelect.loadDetail + assetsIds)





        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));




    } catch (e) {
        console.log(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/auditory/:auditory/asset-type-select/:assetType', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryAssetTypeSelect = AuditoryAssetTypeSelect(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryAssetTypeSelect.auditory)
        .input('assetType',sql.Int,auditoryAssetTypeSelect.assetType)
        .query(auditoryAssetTypeSelect.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/auditory/:auditory/asset-type-select/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let auditoryAssetTypeSelect = AuditoryAssetTypeSelect(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('auditory',sql.Int,auditoryAssetTypeSelect.auditory)
        .query(auditoryAssetTypeSelect.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;