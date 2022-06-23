module.exports = AuditoryType = (data,filter)=> {
    let {id, description,area } = data;
    let db= 'AuditoryType'
    return ({
        id:id,
        description,
        area:area,
        get:`SELECT [id],[description] FROM ${db}`
        ,getByID:`SELECT [id],[description] FROM ${db} WHERE id=@id;`
        ,save:`INSERT INTO ${db} (description) VALUES(@description);`
        ,update:`UPDATE ${db} SET description=@description WHERE id=@id;`
        ,delete:`DELETE ${db} WHERE id=@id;`
    })
}

