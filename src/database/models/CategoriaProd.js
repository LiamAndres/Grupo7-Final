/**
 * Metodo creacion modelo CategoriaProd
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const CategoriaProd = sequelize.define(
        "CategoriaProd",
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