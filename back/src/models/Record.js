const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Record",
    {
      notifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {timestamps : false}
  );
};
