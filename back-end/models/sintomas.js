module.exports = (sequelize, DataTypes) => {
    const Sintomas = sequelize.define('Sintomas', {
      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    Sintomas.associate = function(models) {
      Sintomas.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    };
  
    return Sintomas;
  };
  