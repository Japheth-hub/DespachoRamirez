const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Record",
    {
      notifications: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
  );
};
