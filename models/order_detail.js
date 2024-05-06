'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.food,{foreignKey:"foodID"})
      this.belongsTo(models.order_list, {foreignKey:"orderID"})
    }
  }
  order_detail.init({
    detailID:{
      allowNull:false,
      autoIncrement: true,
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    orderID: DataTypes.INTEGER,
    foodID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};