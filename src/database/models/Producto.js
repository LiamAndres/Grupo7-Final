/**
 * Metodo creacion modelo Producto
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define(
        "Producto",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            referencia:{
                type: DataTypes.STRING
            },
            fabricante: {
                type: DataTypes.STRING   
            },
            direccion:{
                type: DataTypes.STRING
            },
            precio:{
                type: DataTypes.INTEGER
            },
            stock:{
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: "productos",
            timestamps: false
        });

        Producto.associate = function(models){
            Producto.belongsToMany(models.CategoriaProd,{
                as:"categoriasprod",
                through: "producto_categoriasprod",
                foreignKey:"productoId",
                otherKey: "categoriaId",
                timestamps: false
            });
            Producto.belongsToMany(models.Ordenes_compra,{
                as: "ordenes_compra",
                through: "detalle_compra",
                foreignKey:"productoId",
                otherKey: "ordenId",
                timestamps: false
            });
        };       
    
    return Producto;
}