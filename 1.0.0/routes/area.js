const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const AreaModel = require('../models/area');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='area';

router.get('/area', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let area = AreaModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(area.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/area/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let area = AreaModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,area.id)
        .query(area.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/area', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let area = AreaModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('name',sql.NVarChar(40),area.name)
        .query(area.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/area/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let area = AreaModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,area.id)
        .input('name',sql.NVarChar(40),area.name)
        .query(area.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/area/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let area = AreaModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('id',sql.Int,area.id)
        .query(area.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;