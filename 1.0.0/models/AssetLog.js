module.exports = AssetLog = (data, filter) => {
    let { 
         id,
         asset,
         date,
         type,
         subtype,
         description,
         cost,
         capitalize   

    } = data;
    let db = "AssetLog";
    return {
        id,
        asset,
        date,
        type,
        subtype,
        description,
        cost,
        capitalize,
        get: `SELECT
            AL.id,
            AL.asset,
            AL.[date],
            AL.[type] 'type'
            ,ALT.[description] 'typeName'
            ,AL.subtype 'subType'
            ,ALT.[description] 'subTypeName'
            ,AL.[description]
            ,AL.cost
            ,AL.capitalize
            FROM ${db} AL
            INNER JOIN AssetLogType ALT
                ON AL.[type]= ALT.id
            INNER JOIN AssetLogSubType ALST
                ON AL.[subtype]= ALST.id
                where AL.asset=@asset
            `,
        getByID: `SELECT
        AL.id,
        AL.asset,
        AL.[date],
        AL.[type] 'assetLogType'
        ,ALT.[description] 'assetLogTypeName'
        ,AL.subtype 'assetLogSubType'
        ,ALT.[description] 'assetLogSubTypeName'
        ,AL.[description]
        ,AL.cost
        ,AL.capitalize
        FROM ${db} AL
        INNER JOIN AssetLogType ALT
            ON AL.[type]= ALT.id
        INNER JOIN AssetLogSubType ALST
            ON AL.[subtype]= ALST.id
        WHERE  AL.id=@id
        `,
        save: `INSERT INTO ${db} (
            asset,
            [date],
            [type],
            subtype,
            description,
            cost,
            capitalize
        ) VALUES(
            @asset,
            @date,
            @type,
            @subtype,
            @description,
            @cost,
            @capitalize
        );`,
        update: `UPDATE ${db} SET 
        assetID=@asset,
        [date]=@date,
        type=@type,
        subtype=@subtype,
        description=@description,
        cost=@cost,
        capitalize=@capitalize
            WHERE id=@id; `,
        delete: `DELETE ${db} WHERE id=@id`,
    };
};
