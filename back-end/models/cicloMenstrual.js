module.exports = (sequelize, DataTypes) => {
    const CicloMenstrual = sequelize.define('CicloMenstrual', {
      inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fim: {
        type: DataTypes.DATE,
      },
    });
  
    CicloMenstrual.associate = function(models) {
      CicloMenstrual.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    };
  
    return CicloMenstrual;
  };
  