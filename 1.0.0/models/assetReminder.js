module.exports = AssetReminder = (data,filter)=> {
    let {id,asset,date,description,emailtoSend} = data;
    let db= 'AssetReminder'
    return ({
        id,asset,date,description,emailtoSend,
        get:`SELECT id,[asset],[date],[description],emailtoSend FROM ${db} where asset=@asset`
        ,getByID:`SELECT id,[asset],[date],[description],emailtoSend FROM ${db} WHERE id=@id AND asset=@asset`
        ,save:`INSERT INTO ${db} ([asset],[date],[description],emailtoSend) VALUES(@asset,@date,@description,@emailtoSend);`
        ,update:`UPDATE ${db} SET [date]=@date,[description]=@description,emailtoSend=@emailtoSend WHERE asset=@asset AND id=@id;`
        ,delete:`DELETE ${db} WHERE id=@id;`
    })
}

