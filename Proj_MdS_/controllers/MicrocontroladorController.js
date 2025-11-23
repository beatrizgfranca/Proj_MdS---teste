const Microcontrolador = require('../models/Microcontrolador')
const Sala = require('../models/Sala')
const Usuario = require('../models/Usuario')
const path = require('path');

class MicrocontroladorController {

    static async register(req, res) {
        try {

            const { sala_id } = req.body;
            
            if (!sala_id){
                throw new Error('Campo está vazio')
            }

            const doesSalaExist = await Sala.findByPk(sala_id);

            if(!doesSalaExist){
                throw new Error('Sala não existe')
            }

            const microcontrolador = await Microcontrolador.create({
                sala_id
            })

            res.json({success: true, message: 'Microcontrolador registrado com sucesso!'})
            
        } catch (error) {
            
            console.error('Erro ao registrar o microcontrolador', error.message)
            return res.status(500).json({success: false, message: error.message})

        }
    }

    static async delete(req, res){

        try {
            
            const microcontrolador_id =  req.body;
            
            if(!microcontrolador_id){
                throw new Error('Campo vazio')
            }

            const doesControladorExist = Microcontrolador.findByPk(microcontrolador_id);

            if(!doesControladorExist){
                throw new Error("Microcontrolador não existe")
            }

            const microcontrolador = await Microcontrolador.delete(microcontrolador_id);

            res.json({success: true, message: "Microcontrolador deletado!"})

        } catch (error) {
            console.error('Erro ao registrar o microcontrolador', error.message)
            return res.status(500).json({success: false, message: error.message})
        }

    }

    static async listAll(req, res){

        try {
            
            const microcontrolador = await Microcontrolador.findAll();

            res.json({success: true, data: microcontrolador})

        } catch (error) {
            console.error('Erro ao listar', error)
            return res.status(500).json({success: false, message: error})
        }

    }

}

module.exports = MicrocontroladorController;