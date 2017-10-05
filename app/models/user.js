module.exports = function (sequelize, DataTypes) {
    // Add code here to create a Song model
    //  This model has a artist, a title, a year, raw_total, raw_usa, raw_uk,
    // raw_eur and raw_row
    // A return is used to return the song after defining it

    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    return User;
};