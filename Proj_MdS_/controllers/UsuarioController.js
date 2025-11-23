<<<<<<< HEAD:controllers/UsuarioController.js
require("dotenv").config();
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser");
const SECRET = process.env.JWT_SECRET;

class UsuarioController {

  static async registrar(req, res) {

    try {

      const { nome, email, senha, confirmarSenha, cpf, userType } = req.body;

      let newUser;

      if (!nome || !email || !senha || !confirmarSenha || !cpf || !userType) {
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

      const hashedPass = bcrypt.hashSync(senha, 10)

      if (userType == "admin") {
        newUser = await Usuario.create({
          nome,
          email,
          senha: hashedPass,
          cpf,
          admin: true
        });
      } else {
        newUser = await Usuario.create({
          nome,
          email,
          senha: hashedPass,
          cpf,
          admin: false
        });
      }

      const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,   // não acessível via JS
        secure: true,     // só em HTTPS
        sameSite: "strict"
      });

      res.status(201).json({ success: true, message: "Usuário registrado com sucesso!", auth: true });

    } catch (error) {
      console.error("Erro ao registrar", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor", auth: false });
    }

  }

  static async login(req, res) {

    try {

      const { email, senha } = req.body;

      if (!email || !senha) {
        throw new Error("Email e senha são obrigatórios");
      }

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        throw new Error("Credenciais inválidas");
      }

      const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,   // não acessível via JS
        secure: true,     // só em HTTPS
        sameSite: "strict"
      });


      res.json({ success: true, message: "Login bem-sucedido", user: usuario.id });

    } catch (error) {
      console.error("Erro ao logar", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor" });
    }

  }

}

=======
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

>>>>>>> 932a183b58a75f044a419dcf0c9b8c10dd17341c:Proj_MdS_/controllers/UsuarioController.js
module.exports = UsuarioController;