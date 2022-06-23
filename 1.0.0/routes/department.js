const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const DepartmentModel = require('../models/department');
const {
    successMessage,
    failMessage
} = require('../lib/handler');

const modelName ='department';

router.get('/area/:area/department', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let department = DepartmentModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,department.area)
        .query(department.get);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.get('/area/:area/department/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let department = DepartmentModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,department.area)
        .input('id',sql.Int,department.id)
        .query(department.getByID);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.post('/area/:area/department', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let department = DepartmentModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,department.area)
        .input('name',sql.NVarChar(40),department.name)
        .query(department.save);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {

        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});


router.put('/area/:area/department/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let department = DepartmentModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('area',sql.Int,department.area)
        .input('id',sql.Int,department.id)
        .input('name',sql.NVarChar(40),department.name)
        .query(department.update);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});

router.delete('/area/:area/department/:id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let department = DepartmentModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('area',sql.Int,department.area)
        .input('id',sql.Int,department.id)
        .query(department.delete);
        res.status(200).json(successMessage(`${req.method} ${modelName}`,response.recordsets[0]));
    } catch (e) {
        console.error(e)
        res.status(400).json(failMessage(`${req.method} ${modelName}`,e));
    }
});




module.exports = router;