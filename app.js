require("dotenv").config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const path = require('path');
const sequelize = require('./config/db');

const PORT = process.env.PORT;
// Importando rotas
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const salaRoutes = require('./routes/salaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(xss());

// Aplica todos os middlewares padrão de segurança
app.use(helmet());

// Configura a política de segurança de conteúdo (CSP)
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://apis.google.com", "https://cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
        },
    })
);

app.use(
    helmet.crossOriginResourcePolicy({ policy: "same-origin" })
);

app.use(
    helmet.frameguard({ action: 'deny' }) // Evita que sua página seja colocada em iframes
);

app.use(
    helmet.hsts({ maxAge: 31536000, includeSubDomains: true }) // Força HTTPS por 1 ano
);

// Opcional: remove cabeçalho que identifica o servidor
app.use(helmet.hidePoweredBy());

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rotas das paginas

//rotas da api
app.use('/api/agendamento', agendamentoRoutesRoutes);
app.use('/api/sala', salaRoutes);
app.use('/api/usuario', usuarioRoutes);

initDB().then(sequelize => {
    sequelize.sync()
        .then(() => {
            console.log('Modelos sincronizados com o banco de dados');
            app.listen(PORT, () => {
                console.log(`Servidor rodando em http://localhost:${PORT}`);
            });
        })
        .catch(err => {
            console.error('Erro ao sincronizar modelos:', err);
        });
});