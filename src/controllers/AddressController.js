const Address = require('../models/Address')
const User = require('../models/User')

module.exports = {
    async list(req, res) {
        const { user_id } = req.params

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        })

        if (!user)
            return res.status(400).json({ error: `User ${user_id} not found` })

        return res.json(user.addresses)
    },
    async listAll(req, res) {
        const addresses = await Address.findAll()

        return res.json(addresses)
    },
    async store(req, res) {
        const { user_id } = req.params
        const { zipCode, street, number } = req.body

        const user = await User.findByPk(user_id)

        if (!user)
            return res.status(400).json({ error: `User ${user_id} not found` })

        const address = await Address.create({
            zipCode,
            street,
            number,
            user_id
        })

        return res.json(address)
    }
}