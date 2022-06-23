module.exports = Asset = (data, filter) => {
    let { id,type,name,status,description,adquisitionDate,assignedDepartment,assignedArea,assignedDate,warrantyExpiresDate,initialValue,actualValue,lastDayAudited,serialNumber} = data;
    let db = "Asset";
    return {
            id,
            type,
            name,
            status,
            description,
            adquisitionDate,
            assignedDepartment,
            assignedArea,
            assignedDate,
            warrantyExpiresDate,
            initialValue,
            actualValue,
            lastDayAudited,
            serialNumber,
        get: `SELECT
            A.id,
            A.[type] 'type'
            ,AT.[name] 'typeName'
            ,A.[name]
            ,A.[status] 'status'
            ,[AS].[name] 'statusName'
            ,A.[description]
            ,A.adquisitionDate
            ,A.assignedArea 'assignedArea'
            ,Area.name 'assignedAreaName'
            ,A.assignedDepartment 'assignedDepartment'
            ,D.name 'assignedDepartmentName'
            ,A.assignedDate
            ,A.warrantyExpiresDate
            ,A.initialValue
            ,A.actualValue
            ,A.lastDayAudited
            ,A.serialNumber
            FROM ${db} A
            INNER JOIN AssetType AT
                ON A.[type]= AT.id
            INNER JOIN AssetStatus [AS]
                ON A.[status]= [AS].id
            INNER JOIN [Area] Area
                ON A.[assignedArea]= Area.id
            INNER JOIN [Department] D
                ON A.[assignedDepartment]= D.id
            `,
        getByID: `SELECT
        A.id
        ,A.[type] 'assetTypeID'
        ,AT.[name] 'assetTypeName'
        ,A.[name]
        ,A.[status] 'assetStatus'
        ,[AS].[name] 'assetStatusName'
        ,A.[description]
        ,A.adquisitionDate
        ,A.assignedArea 'assignedArea'
        ,Area.name 'assignedAreaName'
        ,A.assignedDepartment 'assignedDepartment'
        ,D.name 'assignedDepartmentName'
        ,A.assignedDate
        ,A.warrantyExpiresDate
        ,A.initialValue
        ,A.actualValue
        ,A.lastDayAudited
        ,A.serialNumber
        FROM ${db} A
        INNER JOIN AssetType AT
            ON A.[type]= AT.id
        INNER JOIN AssetStatus [AS]
            ON A.[status]= [AS].id
        INNER JOIN [Area] Area
            ON A.[assignedArea]= Area.id
        INNER JOIN [Department] D
            ON A.[assignedDepartment]= D.id
        WHERE  A.id=@id
        `,
        save: `INSERT INTO ${db} (
            id,
            type,
            name,
            status,
            description,
            adquisitionDate,
            assignedDepartment,
            assignedArea,
            assignedDate,
            warrantyExpiresDate,
            initialValue,
            actualValue,
            serialNumber
        ) VALUES(
            @id,
            @type,
            @name,
            @status,
            @description,
            @adquisitionDate,
            @assignedDepartment,
            @assignedArea,
            @assignedDate,
            @warrantyExpiresDate,
            @initialValue,
            @actualValue,
            @serialNumber
        );`,
        update: `UPDATE ${db} SET 
            id=@id,
            [type]=@type,
            [name]=@name,
            [status]=@status,
            description=@description,
            adquisitionDate=@adquisitionDate,
            assignedDepartment=@assignedDepartment,
            assignedArea=@assignedArea,
            assignedDate=@assignedDate,
            warrantyExpiresDate=@warrantyExpiresDate,
            initialValue=@initialValue,
            actualValue=@actualValue,
            serialNumber=@serialNumber
            WHERE id=@id; `,
        delete: `DELETE ${db} WHERE id=@id`,
    
        
        
    
    
    };
};
