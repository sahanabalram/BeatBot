//For passport we need username and password
// TABLE AUTO CREATED AS SEARCHES
module.exports = function(sequelize, DataTypes) {
    // Initializes "User" in the Table: Users with a username and password column (id, created, updated) will be made by sequelize
    var Search = sequelize.define("Search", {
        query: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        }
    });

    Search.associate = function(models) {
        Search.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Search;
};