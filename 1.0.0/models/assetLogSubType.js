module.exports = AssetLogSubType = (data,filter)=> {
    let {id, description,assetLogType} = data;
    let db= 'AssetLogSubType'
    return ({
        id,
        description,
        assetLogType,
        get:`SELECT 
        ALST.[id],
        ALST.[description],
        ALST.assetLogType 'assetLogTypeID',
        ALT.description 'assetLogTypeName'
        FROM ${db} ALST
        INNER JOIN AssetLogType ALT
        ON ALST.assetLogType = ALT.id
        WHERE ALST.assetLogType= @assetLogType;
            `
        ,getByID:`SELECT 
        ALST.[id],
        ALST.[description],
        ALST.assetLogType 'assetLogTypeID',
        ALT.description 'assetLogTypeName'
        FROM ${db} ALST
        INNER JOIN AssetLogType ALT
            ON ALST.assetLogType = ALT.id;`
        ,save:`INSERT INTO ${db} (assetLogType,[description]) VALUES(@assetLogType,@description);`
        ,update:`UPDATE ${db} SET [description]=@description WHERE id=@id AND assetLogType=@assetLogType;`
        ,delete:`DELETE ${db} WHERE id=@id;`
    })
}

