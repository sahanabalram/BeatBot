//For passport we need username and password

module.exports = function(sequelize, DataTypes) {
    // Initializes "User" in the Table: Users with a username and password column (id, created, updated) will be made by sequelize
    var User = sequelize.define("User", {
        username: {
            // Sets username to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
            // Checks to make sure the value entered is a valid email address
            isEmail: true
        },
        password: {
            // Sets username to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not empty
            notEmpty: true
        }
    });

    User.associate = function(models) {
        // Associating User with Posts
        // When an User is deleted, also delete any associated Posts
        User.hasMany(models.Playlist, {
          onDelete: "cascade"
        });
        User.hasMany(models.Search, {
            onDelete: "cascade"
          });
      };

    return User;
};