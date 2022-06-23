module.exports = AuditoryAssetTypeSelect = (data,filter)=> {
    let {auditory, assetType} = data;
    let db = 'AuditoryAssetTypeSelect'
    return ({
        auditory,assetType,
        get:`SELECT AATS.[auditory],AATS.[assetType], AT.[name] 'assetTypeName' FROM ${db} AATS 
        INNER JOIN AssetType AT
         ON AATS.assetType = AT.id where auditory=@auditory`
        ,load:`INSERT INTO ${db} ([auditory],[assetType]) VALUES `
        ,loadDetail:`INSERT INTO AuditoryDetail ([auditory],[asset],[checked]) VALUES `
        ,delete:`DELETE ${db} where auditory=@auditory`
        ,getAssetsFromAuditory:`select id 
        from Asset A
         where A.[type] IN (
            SELECT AssetType 
                from AuditoryAssetTypeSelect 
            where auditory = @auditory
         )
        `
    })
}

