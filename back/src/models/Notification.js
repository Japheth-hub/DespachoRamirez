const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Notification",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
