/**
 * Metodo creacion modelo Usuario
 * @param {import('sequelize').sequelize} sequelize 
 * @param {import('sequelize/dist').DataTypes} DataTypes 
 */
 module.exports = (sequelize, dataTypes) => {
    // const alias se puede llamar como sea, pepeTablas
    const alias = "Usuario"
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING   
        },
        email:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.INTEGER
        },
        stock:{
            type: dataTypes.INTEGER
        }

    }
    const config = {
        tableName: "usuarios",
        timestamps: false
    }
    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models){
        Usuario.hasMany(models.Ordenes_compra,{
            as:"ordenes_compra",
            foreignKey:"usuarioId",
        });
        Usuario.belongsToMany(models.Rol,{
            as: "rol",
            through: "usuario_rol",
            foreignKey:"usuarioId",
            otherKey: "categoriaId",
            timestamps: false
        });
    };

    return Usuario;
    
    
}
        /* "Usuario",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre:{
                type: DataTypes.STRING
            },
            apellido: {
                type: DataTypes.STRING   
            },
            email:{
                type: DataTypes.STRING
            },
           contraseña:{
                type: DataTypes.STRING
            }
        },
        {
            tableName: "usuarios",
            timestamps: false
        });
        Usuario.associate = function(models){
            Usuario.hasMany(models.Ordenes_compra,{
                as:"ordenes_compra",
                foreignKey:"usuarioId",
            });
            Usuario.belongsToMany(models.Rol,{
                as: "rol",
                through: "usuario_rol",
                foreignKey:"usuarioId",
                otherKey: "categoriaId",
                timestamps: false
            });
        };
    return Usuario; 
}*/