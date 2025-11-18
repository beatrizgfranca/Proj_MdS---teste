const Sala = require('../models/Sala');
const Usuario = require('../models/Usuario');
const path = require('path');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');

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
    static async registrarSala(req, res){

        try {
            
            const {usuario_id, nomeSala} = req.body;

        if(!usuario_id || !nomeSala){
            throw new Error("Id do usuario ou sala vazios")
        }

        const usuario = await Usuario.findByPk(usuario_id);
        const sala = await Sala.findOne({where: {nome: nomeSala}})

        if(!usuario){
            throw new Error("Usuário não existe")
        }

        if(sala){
            throw new Error("Sala com este nome já existe")
        }

        await Sala.create({
            nomeSala
        })

        res.json({success: true, message: "Sala criada com sucesso"})

        } catch (error) {
            console.error('Erro ao registrar sala', error.message)
            return res.status(500).json({success: false, message: error.message})
        }

    }

    static async gerarQRCodesPDF(req, res) {
        try {
            // 1. Buscar salas
            const salas = await Sala.findAll();

            // 2. Criar PDF
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="salas_qrcodes.pdf"');
            doc.pipe(res);

            // 3. Iterar salas e gerar QRCode
            for (const sala of salas) {
                const qrDataUrl = await QRCode.toDataURL(String(sala.id));
                const qrImage = qrDataUrl.replace(/^data:image\/png;base64,/, "");
                const imgBuffer = Buffer.from(qrImage, 'base64');

                // 4. Adicionar ao PDF
                doc.fontSize(16).text(`Sala: ${sala.nome} (ID: ${sala.id})`, { align: 'left' });
                doc.image(imgBuffer, { fit: [150, 150] });
                doc.moveDown(2);
            }

            doc.end();
        } catch (error) {
            console.error('Erro ao gerar PDF', error);
            return res.status(500).json({ success: false, message: error });
        }
    }

}