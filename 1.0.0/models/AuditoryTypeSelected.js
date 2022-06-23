module.exports = AuditoryAssetTypeSelected = (data,filter)=> {
    let {id, auditory,assetType } = data;
    let db='AuditoryAssetTypeSelected'
    return ({
        id,auditory,assetType,
        get:`SELECT
             [id],
             [auditory],
             [assetType],
             FROM ${db}
             where auditory=@auditory
             `
        ,getByID:`SELECT
            [id],
            [auditory],
            [assetType],
            FROM ${db}
            WHERE id=@id
            `
        ,save:`INSERT INTO ${db} ([auditory],[assetType]) VALUES(@auditory,@assetType);`
        ,update:`UPDATE ${db} SET auditory=@auditory,[assetType]=@assetType WHERE id=@id; `
        ,delete:`DELETE ${db} WHERE id=@id;`
    })
}

