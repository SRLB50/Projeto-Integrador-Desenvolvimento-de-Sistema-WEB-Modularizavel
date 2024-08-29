module.exports = (sequelize, DataTypes) => {
    const CicloMenstrual = sequelize.define('CicloMenstrual', {
      inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      fim: {
        type: DataTypes.DATEONLY,
      },
    });
  
    CicloMenstrual.associate = function(models) {
      CicloMenstrual.belongsTo(models.Usuario, { foreignKey: 'usuario_id', allowNull: false});
    };
  
    return CicloMenstrual;
  };
  