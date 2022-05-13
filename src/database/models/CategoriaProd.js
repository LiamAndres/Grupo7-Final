/**
 * Metodo creacion modelo CategoriaProd
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
module.exports = (sequelize, dataTypes) => {
    const CategoriaProd = sequelize.define(
        "CategoriaProd",
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre:{
                type: dataTypes.STRING
            },
            descripcion: {
                type: dataTypes.STRING   
            }
        },
        {
            tableName: "categoriasprod",
            timestamps: false
        });
        CategoriaProd.associate = function(models){
            CategoriaProd.belongsToMany(models.Producto,{
                as:"productos",
                through: "producto_categoriasprod",
                foreignKey:"categoriaId",
                otherKey: "productoId",
                timestamps: false
            });
           
        };
        
    return CategoriaProd;
}