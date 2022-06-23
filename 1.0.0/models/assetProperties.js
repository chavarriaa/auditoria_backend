module.exports = AssetProperties = (data,filter)=> {
    let {id,asset, property,description} = data;
    let db= 'AssetProperties'
    return ({
        id,
        asset,
        property,
        description,
        get:`SELECT [id],[asset],[property],[description] FROM ${db} where asset=@asset`
        ,getByID:`SELECT [id] [asset],[property],[description] FROM ${db} WHERE asset=@asset AND [property] =@property`
        ,save:`INSERT INTO ${db} ([asset],[property],[description]) VALUES(@asset,@property,@description);`
        ,update:`UPDATE ${db} SET [description]=@description,[property]=@property WHERE asset=@asset and [id]=@id ;`
        ,delete:`DELETE ${db} WHERE asset=@asset AND [id]=@id;`
    })
}

