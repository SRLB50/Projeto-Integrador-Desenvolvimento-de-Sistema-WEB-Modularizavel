module.exports = (sequelize, DataTypes) => {
    const Gravidez = sequelize.define('Gravidez', {
      inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      fim: {
        type: DataTypes.DATEONLY,
      },
    });
  
    Gravidez.associate = function(models) {
      Gravidez.belongsTo(models.Usuario, { foreignKey: 'usuario_id', allowNull: false});
    };
  
    return Gravidez;
  };
  