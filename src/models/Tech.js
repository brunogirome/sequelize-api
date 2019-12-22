const { Model, DataTypes } = require('sequelize')

module.exports = class Tech extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'techs'//Força o sequelize a entnder que o nome da
            //tabela deste model é techs, pois ele "pluraliza" o nome do
            //model na tabela. Então "tech" vira "teches"
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, {
            foreignKey: 'tech_id',
            through: 'users_techs',
            as: 'users'
        })
    }
}