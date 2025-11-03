const Usuario = require("../models/Usuario");
const QRCode = require("qrcode");

function gerarCodigoAleatorio(tamanho) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < tamanho; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

class UsuarioController {
  static async gerarQRCode(req, res) {
   try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }

      // gera código único
      let codigo;
      let existe = true;

      while (existe) {
        codigo = gerarCodigoAleatorio(10);
        const usuarioExistente = await Usuario.findOne({ where: { qrcode: codigo } });
        if (!usuarioExistente) {
          existe = false;
        }
      }

      // gera QR Code com esse código
      const qrCodeDataURL = await QRCode.toDataURL(codigo);

      // salva no banco
      usuario.qrcode = codigo;
      await usuario.save();

      return res.status(200).json({
        success: true,
        message: "QR Code gerado e salvo com sucesso!",
        codigo,
        qrcode: qrCodeDataURL
      });
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor" });
    }
  }
}

module.exports = UsuarioController;
