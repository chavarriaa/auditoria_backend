module.exports = AuditoryDiscovery = (data,filter)=> {
    let {id, auditory,auditoryDetail,asset,description,auditor,status } = data;
    let db='AuditoryDiscovery'
    return ({
        id, auditory,auditoryDetail,asset,description,auditor,status,
        get:`SELECT 
        AD.[id],

        AD.[auditoryDetail],
        AD.[asset],
        AD.[description],
        AD.[auditor],
        AD.[status],
        FROM ${db} AD
        WHERE AD.[AuditoryDetail] = @auditoryDetail;
        `
        ,getByID:`SELECT 
            AD.[id],
            AD.[auditory],
            AD.[auditoryDetail],
            AD.[asset],
            AD.[description],
            AD.[auditor],
            AD.[status],
            FROM ${db} AD
            WHERE AD.[AuditoryDetail] = @auditoryDetail 
            AND AD.[id] = @id;`
        ,save:`INSERT INTO ${db} ([auditory],[asset],[description],[auditor],[status])
            VALUES(@auditory,@asset,@description,@auditor,@status);`
        ,update:`UPDATE ${db} SET [id]=@id,auditory=@auditory,asset=@asset,description=@description,auditor=@auditor,status=@status 
        WHERE [AuditoryDetail] = @auditoryDetail AND id=@id; `
        ,delete:`DELETE ${db} WHERE id=@id AND  [AuditoryDetail] = @auditoryDetail;`
    })
}

