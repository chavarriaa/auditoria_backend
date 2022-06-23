module.exports = AssetStatus = (data,filter)=> {
    let {id, name } = data;
    let db= 'AssetStatus'
    return ({
        id:id,
        name:name,
        get:`SELECT [id],[name] FROM ${db}`
        ,getByID:`SELECT [id],[name] FROM ${db} WHERE id=@id;`
        ,save:`INSERT INTO ${db}(name) VALUES(@name);`
        ,update:`UPDATE ${db} SET name=@name WHERE id=@id;`
        ,delete:`DELETE ${db} WHERE id=@id;`
    })
}

