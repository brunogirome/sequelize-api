const express = require('express')

const UserController = require('./controllers/UserController')
const AddressController = require('./controllers/AddressController')
const TechController = require('./controllers/TechController')
const ReportController = require('./controllers/ReportController')

const routes = express.Router()

routes.get('/users', UserController.list)
routes.post('/users', UserController.store)

routes.get('/users/:user_id/addresses', AddressController.list)
routes.post('/users/:user_id/addresses', AddressController.store)

routes.get('/addresses', AddressController.listAll)

routes.get('/users/:user_id/techs', TechController.list)
routes.post('/users/:user_id/techs', TechController.store)
routes.delete('/users/:user_id/techs', TechController.delete)

routes.get('/report/:tech_name', ReportController.show)

module.exports = routes