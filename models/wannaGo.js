module.exports = (sequelize, DataTypes) => sequelize.define("WannaGo", {
    idk: {
      type: DataTypes.BOOLEAN,
    //   allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    endDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
  });