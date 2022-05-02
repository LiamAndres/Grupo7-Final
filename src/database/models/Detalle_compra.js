/**
 * Metodo creacion modelo Detalle_compra
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, DataTypes) => {
    const Detalle_compra = sequelize.define(
        "Detalle_compra",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            unidades:{
                type: DataTypes.INTEGER
            },
            descripcion: {
                type: DataTypes.STRING   
            },
            referencia:{
                type: DataTypes.STRING
            }
        },
        {
            tableName: "detalle_compra",
            timestamps: false
        }
    );
    return Detalle_compra;
}