module.exports = function(sequelize,DataTypes) {
    var Search = sequelize.define("Search",{
        query: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Search.associate = function(models) {
        Search.belongsTo(models.user, {
            foriegnKey: {
                allowNull: false
            }
        });
    }
    return Search;
}