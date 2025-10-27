// models/Agendamento.js
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
  horario_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horario_fim: {
    type: DataTypes.DATE,
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

module.exports = Agendamento;
