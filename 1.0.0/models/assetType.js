module.exports = AssetType = (data,filter)=> {
    let {id, name,area } = data;
    return ({
        id:id,
        name:name,
        area:area,
        get:`SELECT [id],[name] FROM AssetType`
        ,getByID:`SELECT [id],[name] FROM AssetType WHERE id=@id;`
        ,save:`INSERT INTO AssetType (name) VALUES(@name);`
        ,update:`UPDATE AssetType SET name=@name WHERE id=@id;`
        ,delete:`DELETE AssetType WHERE id=@id;`
    })
}

