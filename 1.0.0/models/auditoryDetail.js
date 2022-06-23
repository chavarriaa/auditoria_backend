module.exports = AuditoryDetail = (data,filter)=> {
    let { id, auditory, asset, checked, checkedDate } = data;
    let db= 'AuditoryDetail'
    return ({
        id, auditory, asset, checked, checkedDate,
        get:`select 
            ad.[id]
            ,ad.[auditory]
            ,ad.[asset]
            ,a.[name] 'assetName'
            ,ar.[name] 'assignedAreaName'
            ,d.[name] 'assignedDepartmentName'
            ,ad.[checked]
            ,ad.[checkedDate]
            from AuditoryDetail ad
            INNER JOIN Asset a
            ON ad.asset = a.id
            INNER JOIN Area ar
            ON a.assignedArea = ar.id
            INNER JOIN Department d
            ON a.assignedDepartment = d.id
            WHERE ad.auditory=@auditory;`
        ,save:`INSERT INTO ${db} (
            ,[auditory]
            ,[asset]
            ,[checked]
            ,[checkedDate]
            ) VALUES(@auditory,@asset,@checked,@checkedDate);`
        ,update:`UPDATE ${db} SET 
            [checked] = @checked
            ,[checkedDate] = @checkedDate 
            WHERE id=@id AND auditory=@auditory;`
    })
}

