module.exports = AuditoryDiscoverTracking = (data,filter)=> {
    let {id,AuditoryDiscovery,description } = data;
    let db='AuditoryDiscoverTracking'
    return ({
        id:id,
        AuditoryDiscovery,description,
        get:`SELECT *
            FROM ${db} AD
            WHERE AD.[AuditoryDetail] = @auditoryDetail;
        `
        ,getByID:`SELECT 
            AD.[id],
            AD.[auditory],
            AD.[auditoryDetail],
            AD.[description],
            FROM ${db} AD
            WHERE AD.[AuditoryDetail] = @auditoryDetail 
            AND AD.[id] = @id;`
        ,save:`INSERT INTO ${db} ([id],[auditory],[auditoryDetail],[asset],[description],[auditor],[status])
            VALUES(@id,@auditory,@auditoryDetail,@asset,@description,@auditor,@status);`
        ,update:`UPDATE ${db} SET [id]=@id,auditory=@auditory,asset=@asset,description=@description,auditor=@auditor,status=@status 
        WHERE [AuditoryDetail] = @auditoryDetail AND id=@id; `
        ,delete:`DELETE ${db} WHERE id=@id AND  [AuditoryDetail] = @auditoryDetail;`
    })
}

