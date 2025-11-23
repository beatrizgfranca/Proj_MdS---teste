<<<<<<< HEAD:app.js
require("dotenv").config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { initDB } = require('./config/db'); // só importa initDB

const PORT = process.env.PORT;

// Importando rotas
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const salaRoutes = require('./routes/salaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://apis.google.com",
        "https://cdn.jsdelivr.net",
        "https://cdn.tailwindcss.com",
        "https://cdn.jsdelivr.net/npm/chart.js"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com"
      ],
      imgSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  })
);

app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet.hidePoweredBy());

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas da API
app.use('/api/agendamento', agendamentoRoutes);
app.use('/api/sala', salaRoutes);
app.use('/api/usuario', usuarioRoutes);

// Rotas de páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/pages/index.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/pages/cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/pages/login.html'));
});

// Inicializa DB e sobe servidor
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao inicializar banco:', err);
});
=======
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
app.use('/api/agendamento', agendamentoRoutes);
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
>>>>>>> 932a183b58a75f044a419dcf0c9b8c10dd17341c:Proj_MdS_/app.js
