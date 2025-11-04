const Sala = require('../models/Sala');
const Usuario = require('../models/Usuario');
const path = require('path');

class SalaController {

    static async listarSalas(req, res) {

        try {

            const salas = await Sala.findAll();

            res.json({success: true, data: salas});
            
        } catch (error) {
            console.error('Erro ao listar salas', error)
            return res.status(500).json({success: false, message: error})
        }

    }

}