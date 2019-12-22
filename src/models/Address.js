const { Model, DataTypes } = require('sequelize')

module.exports = class Address extends Model {
    static init(sequelize){
        super.init({
            zipCode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })
    }
}