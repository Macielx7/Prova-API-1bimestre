const express = require('express')

const FuncionarioController = require('../controllers/FuncionarioController')

const router = express.Router()

router.get('/', function (req, res){
    res.json({})
})

router.post('/funcionario', (req, res) => FuncionarioController.create(req, res))
router.get('/funcionario', (req, res) => FuncionarioController.getAll(req, res))
router.get('/funcionario/cargo', (req, res) => FuncionarioController.getCargoEspecifico(req, res))
router.put('/funcionario/reajuste/:id', (req, res) => FuncionarioController.reajuste(req, res))





module.exports = router