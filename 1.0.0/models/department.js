module.exports = Department = (data,filter)=> {
    let {id, name,area } = data;
    let db='Department'
    return ({
        id:id,
        name:name,
        area:area,
        get:`SELECT
             D.[id]
            ,D.[name]
            ,D.[area] 'areaID'
            ,A.[name] 'areaName'
            FROM ${db} D
            INNER JOIN [area] A 
            ON D.area = A.id
            WHERE d.area=@area`
        ,getByID:`SELECT 
        D.[id]
            ,D.[name]
            ,D.[area] AreaID
            ,A.[name] AreaName
            FROM ${db} D
            INNER JOIN [area] A 
            ON D.area = A.id
            WHERE d.area=@area
            AND D.id=@id;`
        ,save:`INSERT INTO ${db} (name,[area]) VALUES(@name,@area);`
        ,update:`UPDATE ${db} SET name=@name,[area]=@area WHERE id=@id; `
        ,delete:`DELETE ${db} WHERE id=@id AND [area]=@area;`
    })
}

