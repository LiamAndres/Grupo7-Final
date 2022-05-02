/**
 * Metodo creacion modelo Rol
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define(
        "Rol",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre:{
                type: DataTypes.STRING
            },
            descripcion: {
                type: DataTypes.STRING   
            }
        },
        {
            tableName: "rol",
            timestamps: false
        });
        Rol.associate = function(models){
            Rol.belongsToMany(models.Usuario,{
                as: "usuarios",
                through: "usuario_rol",
                foreignKey:"categoriaId",
                otherKey: "usuarioId",
                timestamps: false
            });
        };
    return Rol;
}