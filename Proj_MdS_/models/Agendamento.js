<<<<<<< HEAD:models/Agendamento.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Usuario = require('./Usuario');
const Sala = require('./Sala');

const Agendamento = sequelize.define('Agendamento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data_agendamento: {   // <-- novo campo
    type: DataTypes.DATEONLY, // apenas a data (sem hora)
    allowNull: false
  },
  horario_inicio: {
    type: DataTypes.TIME, // só hora/minuto
    allowNull: false
  },
  horario_fim: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'Agendamento',
  timestamps: false
});

// Relacionamentos
Agendamento.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Agendamento, { foreignKey: 'usuario_id' });

Agendamento.belongsTo(Sala, { foreignKey: 'sala_id' });
Sala.hasMany(Agendamento, { foreignKey: 'sala_id' });

=======
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Sala = require('./Sala');

const Agendamento = sequelize.define('Agendamento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data_agendamento: {   // <-- novo campo
    type: DataTypes.DATEONLY, // apenas a data (sem hora)
    allowNull: false
  },
  horario_inicio: {
    type: DataTypes.TIME, // só hora/minuto
    allowNull: false
  },
  horario_fim: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'Agendamento',
  timestamps: false
});

// Relacionamentos
Agendamento.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Agendamento, { foreignKey: 'usuario_id' });

Agendamento.belongsTo(Sala, { foreignKey: 'sala_id' });
Sala.hasMany(Agendamento, { foreignKey: 'sala_id' });

>>>>>>> 932a183b58a75f044a419dcf0c9b8c10dd17341c:Proj_MdS_/models/Agendamento.js
module.exports = Agendamento;