module.exports = function (sequelize, DataTypes) {
  const Crew = sequelize.define("Matches", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attractionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateEntered: {
      type: DataTypes.RANGE(DataTypes.DATEONLY),
      allowNull: true,
    }

  });
  return Crew;
};