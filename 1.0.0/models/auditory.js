module.exports = Auditory = (data,filter)=> {
    let {id, startDate,startEnd,description,auditor,type } = data;
    let db= 'Auditory'
    return ({
        id, startDate,startEnd,description,auditor,type,
        get:`SELECT
             A.[id]
            ,A.[startDate]
            ,A.[endDate]
            ,A.[description]
            ,A.[auditor]
            ,A.[type]
            ,AT.[description] 'typeName'
            FROM ${db} A
            INNER JOIN AuditoryType AT
            ON A.[type] =AT.[id];`
        ,getByID:`SELECT
                A.[id]
            ,A.[startDate]
            ,A.[endDate]
            ,A.[description]
            ,A.[auditor]
            ,A.[type]
            ,AT.[description] 'typeName'
            FROM ${db} A
            INNER JOIN AuditoryType AT
            ON A.[type] =AT.[id] 
            WHERE A.id=A.@id;`
        ,save:`INSERT INTO ${db} ([startDate],[endDate],[description],[auditor],[type]) VALUES(@startDate,@endDate,@description,@auditor,@type);`
        ,update:`UPDATE ${db} SET 
            [startDate]=@startDate
            ,[endDate]=@endDate
            ,[description]=@description
            ,[auditor]=@auditor
            ,[type]=@type
            WHERE id=@id;`
        ,delete:`DELETE ${db} WHERE id=@id;`
    })
}

