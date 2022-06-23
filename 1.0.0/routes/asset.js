const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../lib/config");
const AssetModel = require("../models/asset");
const AssetLog = require("../models/AssetLog");

const { successMessage, failMessage } = require("../lib/handler");

const modelName = "asset";

router.get("/asset", async (req, res) => {
  try {
    let data = { ...req.body, ...req.params };
    let asset = AssetModel(data, req.query);
    let pool = await sql.connect(config);
    let response = await pool.request().query(asset.get);
    res
      .status(200)
      .json(
        successMessage(`${req.method} ${modelName}`, response.recordsets[0])
      );
  } catch (e) {
    console.error(e);
    res.status(400).json(failMessage(`${req.method} ${modelName}`, e));
  }
});

router.get("/asset/:id", async (req, res) => {
  try {
    let data = { ...req.body, ...req.params };

    let asset = AssetModel(data, req.query);
    let pool = await sql.connect(config);
    let response = await pool
      .request()
      .input("id", sql.VarChar(8), asset.id)
      .query(asset.getByID);
    res
      .status(200)
      .json(
        successMessage(`${req.method} ${modelName}`, response.recordsets[0])
      );
  } catch (e) {
    res.status(400).json(failMessage(`${req.method} ${modelName}`, e));
  }
});

router.get("/asset/:id/complete", async (req, res) => {
  try {
    let data = { ...req.body, ...req.params };

    let asset = AssetModel(data, req.query);
    let assetLogs = AssetLog(data);
    let pool = await sql.connect(config);

    let assetInfo = await pool
      .request()
      .input("id", sql.VarChar(8), asset.id)
      .query(asset.getByID);

    let assetProperties = await pool
      .request()
      .input("asset", sql.VarChar, asset.id)
      .query("select * from AssetProperties where asset=@asset");

    let assetReminders = await pool
      .request()
      .input("asset", sql.VarChar, asset.id)
      .query(assetLogs.get);

    let finalResult = {
      ...assetInfo.recordset[0],
      properties: assetProperties.recordsets[0],
      reminders: assetReminders.recordsets[0],
    };

    
    res
      .status(200)
      .json(successMessage(`${req.method} ${modelName}`, finalResult));
  } catch (e) {
    console.log(e);
    res.status(400).json(failMessage(`${req.method} ${modelName}`, e));
  }
});

router.post("/asset", async (req, res) => {
  try {
    let data = { ...req.body, ...req.params };
    let asset = AssetModel(data, req.query);
    let pool = await sql.connect(config);
    console.log(data)
    let response = await pool.request()
      .input("id", sql.VarChar(8), asset.id)
      .input("type", sql.Int, asset.type)
      .input("name", sql.VarChar(40), asset.name)
      .input("status", sql.Int, asset.status)
      .input("description", sql.VarChar(sql.MAX), asset.description)
      .input("adquisitionDate", sql.Date, Date(asset.adquisitionDate))
      .input("assignedDepartment", sql.Int, asset.assignedDepartment)
      .input("assignedArea", sql.Int, asset.assignedArea)
      .input("assignedDate", sql.Date, new Date(asset.assignedDate))
      .input("warrantyExpiresDate", sql.Date, Date(asset.warrantyExpiresDate))
      // .input("lastDayAudited", sql.Date, asset.lastDayAudited)
      .input("initialValue", sql.Decimal(12, 2), asset.initialValue)
      .input("actualValue", sql.Decimal(12, 2), asset.actualValue)
      .input("serialNumber", sql.VarChar(20), asset.serialNumber)
      .query(asset.save);
    res
      .status(200)
      .json(
        successMessage(`${req.method} ${modelName}`, response.recordsets[0])
      );
  } catch (e) {
    console.log(e)
    res.status(400).json(failMessage(`${req.method} ${modelName}`, e));
  }
});

router.put("/asset/:id", async (req, res) => {
  try {
    let data = { ...req.body, ...req.params };
    console.log(data);
    let asset = AssetModel(data, req.query);
    let pool = await sql.connect(config);
    let response = await pool
      .request()
      .input("id", sql.VarChar(8), asset.id)
      .input("type", sql.Int, asset.type)
      .input("name", sql.VarChar(40), asset.name)
      .input("status", sql.Int, asset.status)
      .input("description", sql.VarChar(sql.MAX), asset.description)
      .input("adquisitionDate", sql.Date, asset.adquisitionDate)
      .input("assignedDepartment", sql.Int, asset.assignedDepartment)
      .input("assignedArea", sql.Int, asset.assignedArea)
      .input("assignedDate", sql.Date, asset.assignedDate)
      .input("warrantyExpiresDate", sql.Date, asset.warrantyExpiresDate)
      //  .input("lastDayAudited", sql.Date, asset.lastDayAudited)
      .input("initialValue", sql.Decimal(12, 2), asset.initialValue)
      .input("actualValue", sql.Decimal(12, 2), asset.actualValue)
      .input("serialNumber", sql.VarChar(20), asset.serialNumber)
      .query(asset.update);
    res
      .status(200)
      .json(
        successMessage(`${req.method} ${modelName}`, response.recordsets[0])
      );
  } catch (e) {
    console.error(e);
    res.status(400).json(failMessage(`${req.method} ${modelName}`, e));
  }
});

router.delete("/asset/:id", async (req, res) => {
  try {
    let data = { ...req.body, ...req.params };
    let asset = AssetModel(data, req.query);
    let pool = await sql.connect(config);
    let response = await pool
      .request()
      .input("area", sql.Int, asset.area)
      .input("id", sql.Int, asset.id)
      .query(asset.delete);
    res
      .status(200)
      .json(
        successMessage(`${req.method} ${modelName}`, response.recordsets[0])
      );
  } catch (e) {
    console.error(e);
    res.status(400).json(failMessage(`${req.method} ${modelName}`, e));
  }
});

module.exports = router;
