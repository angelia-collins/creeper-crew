module.exports = (sequelize, DataTypes) => sequelize.define("Attraction", {
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
