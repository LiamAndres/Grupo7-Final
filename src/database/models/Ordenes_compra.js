/**
 * Metodo creacion modelo Ordenes_compra
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} dataTypes 
 */
 module.exports = (sequelize, dataTypes) => {
    const Ordenes_compra = sequelize.define(
        "Ordenes_compra",
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            total:{
                type: dataTypes.INTEGER
            },
            fecha_compra: {
                type: dataTypes.DATE   
            },
            direccion:{
                type: dataTypes.STRING
            }
        },
        {
            tableName: "ordenes_compra",
            timestamps: false
        });
        Ordenes_compra.associate = function(models){
            Ordenes_compra.belongsToMany(models.Ordenes_compra,{
                as: "ordenes_compra",
                through: "detalle_compra",
                foreignKey:"ordenId",
                otherKey: "productoId",
                timestamps: false
            });
            Ordenes_compra.belongsTo(models.EstadoOrden,{
                as:"estadoorden",
                foreignKey:"estadoOrdenId",
            });
        };
    return Ordenes_compra;
}