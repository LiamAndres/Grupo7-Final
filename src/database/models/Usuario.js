/**
 * Metodo creacion modelo Usuario
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        "Usuario",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre:{
                type: DataTypes.STRING
            },
            apellido: {
                type: DataTypes.STRING   
            },
            email:{
                type: DataTypes.STRING
            },
           contraseña:{
                type: DataTypes.STRING
            }
        },
        {
            tableName: "usuarios",
            timestamps: false
        });

        Usuario.associate = function(models){
            Usuario.hasMany(models.Ordenes_compra,{
                as:"ordenes_compra",
                foreignKey:"usuarioId",
            });
            Usuario.belongsToMany(models.Rol,{
                as: "rol",
                through: "usuario_rol",
                foreignKey:"usuarioId",
                otherKey: "categoriaId",
                timestamps: false
            });
        };
    return Usuario;
}
