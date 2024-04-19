const mongoose = require('mongoose')

const salarioMinimo = 1412
const schema =  mongoose.Schema({
    tipoPessoa: {type: String, 
        required:true,
        maxLength: 20,
        trin:true,
        enum:["PF", "PJ"]
    },

    cpf: {
        type: String,
        validate: [
            {
                validator: function(value) {
                    return !(this.tipoPessoa === "PF" && !value);
                },
                message: "CPF não informado"
            },
            {
                validator: function(value) {
                    return !(value && this.cnpj);
                },
                message: "Favor informar somente uma opção, CPF ou CNPJ, de acordo com o Tipo de Pessoa"
            }
        ],
        match: [/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF INVÁLIDO"],
        required: [function() {
            return this.tipoPessoa === "PF";
        }, "CPF não informado"]
    },
    
    

    cnpj: {
        type: String,
        required: [function() {
            return this.tipoPessoa === "PJ";
        }, "CNPJ não informado"],
        validate: [
            {
                validator: function(value) {
                    return !(this.tipoPessoa === "PJ" && !value);
                },
                message: "CNPJ não informado"
            },
            {
                validator: function(value) {
                    return !(value && this.cpf);
                },
                message: "Favor informar somente uma opção, CPF ou CNPJ, de acordo com o Tipo de Pessoa"
            }
        ],
        match: [/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ INVÁLIDO"],
    },

    nome: {
        type: String,
        required: true,
        trin: true,
        maxLength: 20
    },

    sexo: {
        type: String,
        enum: ["M", "F"],
        validate: {
            validator: function(value) {
                return !(this.tipoPessoa === "PJ" && value);
            },
            message: "O campo sexo só é permitido para Pessoa Física"
        }
    },

    cargo: {
        type: String,
        enum: ["Estagiario","Tecnico","Gerente","Diretor","Presidente"],
        validate: {
            validator: function(value) {
                return !(this.tipoPessoa === "PJ" && value);
            },
            message: "O campo Cargo só é permitido para pessoa Física"
        }

    },

    salario: {
        type: Number,
        required: true,
        min: salarioMinimo
    }

})

const Funcionario = mongoose.model('Funcionario', schema)

module.exports = Funcionario