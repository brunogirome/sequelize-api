const Tech = require('../models/Tech')
const User = require('../models/User')

module.exports = {
    async list(req, res) {
        const { user_id } = req.params

        //O through representa os dados adicionais que acabam vindo da tabela
        //users_techs de relacionamentos. Então é possível aidiconar um
        //attributes: [] pra trazer um array vazio.
        const user = await User.findByPk(user_id, {
            include: { association: 'techs', through: { attributes: [] } }
        })

        return res.json(user.techs)
    },
    async store(req, res) {
        const { user_id } = req.params

        const { name } = req.body

        const user = await User.findByPk(user_id)

        if (!user)
            return res.status(400).json({ error: `User ${user_id} not found` })

        const [tech] = await Tech.findOrCreate({
            where: { name }
        })

        //Métodos auxiliares do Many to Many: Manual do sequelize -> Associations -> 
        //Belongs-To-Many association
        await user.addTech(tech)

        return res.json(tech)
    },
    async delete(req, res) {
        const { user_id } = req.params

        const { name } = req.body

        const user = await User.findByPk(user_id)

        if (!user)
            return res.status(400).json({ error: `User ${user_id} not found` })

        const tech = await Tech.findOne({
            where: { name }
        })

        await user.removeTech(tech)

        return res.json()
    }
}