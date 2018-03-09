module.exports = function(sequelize, DataTypes) {
    // Add code here to create a Song model
    //  This model has a artist, a title, a year, raw_total, raw_usa, raw_uk,
    // raw_eur and raw_row
    // A return is used to return the song after defining it

    var Song = sequelize.define("Song", {
        topTenArtist: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
            /* validate: {
                len:[1,200]
            } */
        },
        topTenTitle : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1,200]
            }
        },
        topTenYear: {
            type: DataTypes.INTEGER
        }
        
    });
    return Song;
}