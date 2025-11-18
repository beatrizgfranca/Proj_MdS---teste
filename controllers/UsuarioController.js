const Usuario = require("../models/Usuario");

class UsuarioController {

  static async registrarUserComum(req, res) {

    try {

      const { nome, email, senha, confirmarSenha, cpf, descriptor } = req.body;

      if (!nome || !email || !senha || !confirmarSenha || !cpf || !descriptor) {
        throw new Error("Todos os campos são obrigatórios");
      }

      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem");
      }

      const emailExistente = await Usuario.findOne({ where: { email } });
      const cpfExistente = await Usuario.findOne({ where: { cpf } });

      if (emailExistente) {
        throw new Error("Email já está em uso");
      }

      if (cpfExistente) {
        throw new Error("CPF já está em uso");
      }

      await Usuario.create({
        nome,
        email,
        senha,
        cpf,
        admin: false,
        descriptor: JSON.stringify(descriptor)
      });

      res.status(201).json({ success: true, message: "Usuário registrado com sucesso!" });

    } catch (error) {
      console.error("Erro ao registrar", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor" });
    }

  }

  static async login(req, res) {

    try {

      const { email, senha } = req.body;

      if (!email || !senha) {
        throw new Error("Email e senha são obrigatórios");
      }

      const usuario = await Usuario.findOne({ where: { email, senha } });

      if (!usuario) {
        throw new Error("Credenciais inválidas");
      }

      res.json({ success: true, message: "Login bem-sucedido", user: usuario.id });

    } catch (error) {
      console.error("Erro ao logar", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor" });
    }

  }

  static async registrarAdimin(req, res) {

    try {

      const { nome, email, senha, confirmarSenha, cpf, descriptor } = req.body;

      if (!nome || !email || !senha || !confirmarSenha || !cpf || !descriptor) {
        throw new Error("Todos os campos são obrigatórios");
      } 

      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem");
      }

      const emailExistente = await Usuario.findOne({ where: { email } });
      const cpfExistente = await Usuario.findOne({ where: { cpf } });

      if (emailExistente) {
        throw new Error("Email já está em uso");
      }

      if (cpfExistente) {
        throw new Error("CPF já está em uso");
      }

      await Usuario.create({
        nome,
        email,
        senha,
        cpf,
        admin: true,
        descriptor: JSON.stringify(descriptor)
      });

      res.status(201).json({ success: true, message: "Administrador registrado com sucesso!" });

    } catch (error) {
      console.error("Erro ao registrar", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor" });
    }

  }

}

module.exports = UsuarioController;