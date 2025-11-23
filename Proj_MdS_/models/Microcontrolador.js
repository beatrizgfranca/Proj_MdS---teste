// models/Microcontrolador.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sala = require('./Sala');

const Microcontrolador = sequelize.define('Microcontrolador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.ENUM('livre', 'ocupado', 'manutencao'),
    defaultValue: 'livre'
  }
}, {
  tableName: 'Microcontrolador',
  timestamps: false
});

// Relacionamento
Microcontrolador.belongsTo(Sala, { foreignKey: 'sala_id' });
Sala.hasMany(Microcontrolador, { foreignKey: 'sala_id' });

module.exports = Microcontrolador;
