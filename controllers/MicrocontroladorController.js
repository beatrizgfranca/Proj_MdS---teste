const Microcontrolador = require('../models/Microcontrolador')
const Sala = require('../models/Sala')
const Usuario = require('../models/Usuario')
const path = require('path');

class MicrocontroladorController {

    static async register(req, res) {
        try {

            const {sala_id, user_id} = req.body;
            const doesSalaExist = await Sala.findByPk(sala_id);
            
            if (!sala_id){
                throw 'Campo está vazio'
            }

            if(!doesSalaExist){
                throw 'Sala não existe'
            }

            const microcontrolador = await Microcontrolador.create({
                sala_id
            })

            res.json({success: true, message: 'Microcontrolador registrado com sucesso!'})

            
        } catch (error) {
            
            console.error('Erro ao registrar o microcontrolador', error)
            return res.status(500).json({success: false, message: error})

        }
    }

}

module.exports = MicrocontroladorController;