/**
 * Metodo creacion modelo Producto_categoriaProd
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, DataTypes) => {
    const Producto_categoriaProd = sequelize.define(
        "Producto_categoriaProd",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            tableName: "producto_categoriasprod",
            timestamps: false
        }
        
    );
    return Producto_categoriaProd;
}