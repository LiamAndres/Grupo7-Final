/**
 * Metodo creacion modelo Producto
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').dataTypes} dataTypes 
 */
 module.exports = (sequelize, dataTypes) => {

    // const alias se puede llamar como sea, pepeTablas
    const alias = "Producto"
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        referencia:{
            type: dataTypes.STRING
        },
        fabricante: {
            type: dataTypes.STRING   
        },
        descripcion:{
            type: dataTypes.STRING
        },
        precio:{
            type: dataTypes.INTEGER
        },
        stock:{
            type: dataTypes.INTEGER
        }

    }
    const config = {
        tableName: "productos",
        timestamps: false
    }
    const Producto = sequelize.define(alias, cols, config);

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
    }

    return Producto; 
}
    /* const Producto2 = sequelize.define(
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
            descripcion:{
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
        };  */     
    
