/**
 * Metodo creacion modelo Ordenes_compra
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, DataTypes) => {
    const Ordenes_compra = sequelize.define(
        "Ordenes_compra",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            total:{
                type: DataTypes.INTEGER
            },
            fecha_compra: {
                type: DataTypes.DATE   
            },
            direccion:{
                type: DataTypes.STRING
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