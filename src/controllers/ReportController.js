const { Op } = require('sequelize')
const User = require('../models/User')

module.exports = {
    async show(req, res) {
        const { tech_name } = req.params

        //Para encontrar os filtros: Manual do Sequelize -> Querying -> Operators
        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    //Esse [] diz pro javascript que o nome do atributo do objeto
                    //é uma variável
                    [Op.like]: '%@email.com.br'
                }
            },
            include: [{
                association: 'addresses',
                attributes: ['zipCode', 'street', 'number'],
                where: { street: {
                    [Op.like]: '%Avenida%'
                } }
            }, {
                association: 'techs',
                required: false,
                attributes: [ 'name' ],
                through: { attributes: [] },
                where: { name: {
                    [Op.like]: `%${tech_name}%`
                } }
            }
            ]
        })

        return res.json(users)
    }
}