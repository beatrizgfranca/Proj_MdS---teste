const Usuario = require("../models/Usuario");
const QRCode = require("qrcode");

// Calcula a Distância Euclidiana entre dois vetores (descritores)
const euclideanDistance = (desc1, desc2) => {
  if (desc1.length !== desc2.length) {
    throw new Error('Descritores devem ter o mesmo tamanho');
  }
  let sum = 0;
  for (let i = 0; i < desc1.length; i++) {
    sum += Math.pow(desc1[i] - desc2[i], 2);
  }
  return Math.sqrt(sum);
};

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

  static async reconhecerRosto(req, res) {

    try {

      const { descriptor: inputDescriptor } = req.body;
      const DISTANCE_THRESHOLD = 0.6; // Limite de tolerância. Menor que isso é considerado a mesma pessoa.

      if (!inputDescriptor) {
        throw new Error("Descritor facial é obrigatório");
      }

      // Busca todos os usuários que têm descritor salvo
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nome', 'face_descriptor'],
        where: { face_descriptor: { [Usuario.sequelize.Op.ne]: null } }
      });

      if (usuarios.length === 0) {
        throw new Error('Nenhum rosto cadastrado no banco de dados.');
      }

      let bestMatch = { user: null, distance: Infinity };

      // Compara o descritor de entrada com todos os cadastrados
      for (const usuario of usuarios) {
        const storedDescriptor = usuario.face_descriptor; // já vem como JSON
        const distance = euclideanDistance(inputDescriptor, storedDescriptor);

        if (distance < bestMatch.distance) {
          bestMatch = { user: usuario, distance };
        }
      }

      // Verifica se o melhor match está abaixo do limite de tolerância
      if (bestMatch.distance < DISTANCE_THRESHOLD) {
        return res.json({
          message: `Reconhecido! Olá, ${bestMatch.user.nome}. Distância: ${bestMatch.distance.toFixed(4)}`,
          user: bestMatch.user.nome,
          distance: bestMatch.distance,
        });

      }
    } catch (error) {
      console.error("Erro ao lerbiometria", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor" });
    }

  }

}

module.exports = UsuarioController;