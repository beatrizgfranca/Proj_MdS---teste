<<<<<<< HEAD:config/db.js
// db.js
require("dotenv").config();
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

async function initDB() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.end();

    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    await sequelize.sync({ force: true });
    console.log("Tabelas criadas/sincronizadas com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar/criar banco:", err);
    process.exit(1);
  }
}

module.exports = { sequelize, initDB };
=======
require("dotenv").config();
const Usuario = require('./models/Usuario');
const Sala = require('./models/Sala');
const Microcontrolador = require('./models/Microcontrolador');
const Agendamento = require('./models/Agendamento');

const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

async function initDB() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.end();

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
      host: DB_HOST,
      dialect: "mysql",
      dialectModule: require("mysql2"),
      logging: false,
    });

    // Cria as tabelas automaticamente ao iniciar
    sequelize.sync({ alter: true })
      .then(() => {
        console.log('Tabelas criadas/sincronizadas com sucesso!');
      })
      .catch(err => console.error('Erro ao criar tabelas:', err));

    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    return sequelize;
  } catch (err) {
    console.error("Erro ao conectar/criar banco:", err);
    process.exit(1);
  }
}

module.exports = initDB;
>>>>>>> 932a183b58a75f044a419dcf0c9b8c10dd17341c:Proj_MdS_/config/db.js
