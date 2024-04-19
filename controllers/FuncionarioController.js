const Funcionario = require("../models/Funcionario")

const FuncionarioController = {

    create: async (req, res) => {
        try {
            res.json(await Funcionario.create(req.body))
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    getAll: async (req, res) => {
        res.json(await Funcionario.find())
    },

    getCargoEspecifico: async (req, res) => {
        try {
            const cargo = req.query.cargo; 
            const funcionarios = await Funcionario.find({ cargo: cargo });
            res.json(funcionarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    reajuste: async (req, res) => {
        try {
            const funcionario = await Funcionario.findById(req.params.id);
            const percentual = req.body.percentual;
            const novoSalario = funcionario.salario * (1 + (percentual / 100));
            funcionario.salario = novoSalario;
            await funcionario.save();
            res.json({ message: "Salário reajustado com sucesso", salarioNovo: novoSalario, funcionario: funcionario});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
     
    
}

module.exports = FuncionarioController