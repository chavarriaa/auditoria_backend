module.exports = AssetLogType = (data,filter)=> {
    let {id, description} = data;
    let db= 'AssetLogType'
    return ({
        id,
        description,
        get:`SELECT [id],[description] FROM ${db}`
        ,getByID:`SELECT [id],[description] FROM ${db} WHERE id=@id;`
        ,save:`INSERT INTO ${db} ([description]) VALUES(@description);`
        ,update:`UPDATE ${db} SET [description]=@description WHERE id=@id;`
        ,delete:`DELETE ${db} WHERE id=@id;`
    })
}

