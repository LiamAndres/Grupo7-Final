/**
 * Metodo creacion modelo  EstadoOrden
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, DataTypes) => {
    const EstadoOrden = sequelize.define(
        "EstadoOrden",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            estado:{
                type: DataTypes.STRING
            },
            descripcion: {
                type: DataTypes.STRING   
            }
        },
        {
            tableName: "estadoorden",
            timestamps: false
        });
        EstadoOrden.associate = function(models){
            EstadoOrden.belongsTo(models.Ordenes_compra,{
                as:"ordenes_compra",
                foreignKey:"estadoOrdenId",
            });
        };
    return EstadoOrden;
}