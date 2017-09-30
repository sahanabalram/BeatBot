//For passport we need username and password

module.exports = function(sequelize, DataTypes) {
    // Initializes "User" in the Table: Users with a username and password column (id, created, updated) will be made by sequelize
    var Playlist = sequelize.define("Playlists", {
        playlistName: {
            // Sets playlistName to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song1: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song2: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song3: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song4: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song5: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song6: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song7: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song8: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song9: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        },
        song10: {
            // Sets song to STRING
            type: DataTypes.STRING,
            // Checks to make sure the value is not null
            allowNull: false,
            // Checks to make sure the value is not an empty string
            notEmpty: true,
        }
    });

    Playlist.associate = function(models) {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return User;
};