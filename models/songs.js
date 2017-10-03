module.exports = function(sequelize, DataTypes) {
    // Add code here to create a Song model
    //  This model has a artist, a title, a year, raw_total, raw_usa, raw_uk,
    // raw_eur and raw_row
    // A return is used to return the song after defining it

    var Song = sequelize.define("song", {
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1,200]
            }
        },
        title : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1,200]
            }
        },
        year: {
            type: DataTypes.INTEGER
        },
        raw_total: {
            type: DataTypes.DECIMAL(10,2)
        },
        raw_usa: {
            type: DataTypes.DECIMAL(10,2)
        },
        raw_uk: {
            type: DataTypes.DECIMAL(10,2)
        },
        raw_eur: {
            type: DataTypes.DECIMAL(10,2)
        },
        raw_row: {
            type: DataTypes.DECIMAL(10,2)
        },
        
    });
    return Song;
}