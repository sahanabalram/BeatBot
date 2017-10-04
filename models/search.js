module.exports = function(sequelize,DataTypes) {
    var Search = sequelize.define("Search",{
        artist: {
            type: DataTypes.STRING
           /*  allowNull: false,
            notEmpty: true */
        },
        title: {
            type: DataTypes.STRING
        },
        song: {
            type: DataTypes.STRING
        }
    });

    Search.associate = function(models) {
        Search.belongsTo(models.User, {
            foriegnKey: {
                allowNull: false
            }
        });
    }
    return Search;
}