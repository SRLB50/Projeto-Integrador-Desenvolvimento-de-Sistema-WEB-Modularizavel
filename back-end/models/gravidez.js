module.exports = (sequelize, DataTypes) => {
    const Gravidez = sequelize.define('Gravidez', {
      inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fim: {
        type: DataTypes.DATE,
      },
    });
  
    Gravidez.associate = function(models) {
      Gravidez.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    };
  
    return Gravidez;
  };
  