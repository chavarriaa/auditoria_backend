const express =require('express');
const app = express();
const cors = require('cors');
app.set('port',3333);
app.set('json spaces',2);
app.use(express.json());

app.use(cors());



app.use('/1.0.0',require('./1.0.0/routes/area'));
app.use('/1.0.0',require('./1.0.0/routes/department'));
app.use('/1.0.0',require('./1.0.0/routes/assetLogSubType'));
app.use('/1.0.0',require('./1.0.0/routes/assetLogType'));
app.use('/1.0.0',require('./1.0.0/routes/assetStatus'));
app.use('/1.0.0',require('./1.0.0/routes/assetType'));
app.use('/1.0.0',require('./1.0.0/routes/asset'));
app.use('/1.0.0',require('./1.0.0/routes/assetProperties'));
app.use('/1.0.0',require('./1.0.0/routes/assetReminder'));
app.use('/1.0.0',require('./1.0.0/routes/assetLog'));
app.use('/1.0.0',require('./1.0.0/routes/auditory'));
app.use('/1.0.0',require('./1.0.0/routes/auditoryDetail'));
app.use('/1.0.0',require('./1.0.0/routes/auditoryDiscoverStatus'));
app.use('/1.0.0',require('./1.0.0/routes/auditoryDiscover'));
app.use('/1.0.0',require('./1.0.0/routes/AuditoryDiscoverTracking'));
app.use('/1.0.0',require('./1.0.0/routes/AuditoryType'));
app.use('/1.0.0',require('./1.0.0/routes/AuditoryAssetTypeSelect'));




app.get('/test',(req,res)=>{
    res.json({message:"EXITO LOCO"})
})

app.listen('3333',(req,res)=>{
    console.log('Escuchando puerto 3333')
});