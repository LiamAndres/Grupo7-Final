/**
 * Metodo creacion modelo Usuario_rol
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, DataTypes) => {
    const Usuario_rol = sequelize.define(
        "Usuario_rol",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            tableName: "usuario_rol",
            timestamps: false
        });
    return Usuario_rol;
}