module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Usuario.associate = function(models) {
      Usuario.hasMany(models.CicloMenstrual, { foreignKey: 'usuario_id' });
      Usuario.hasMany(models.Gravidez, { foreignKey: 'usuario_id' });
      Usuario.hasMany(models.Sintomas, { foreignKey: 'usuario_id' });
    };
  
    return Usuario;
  };
  