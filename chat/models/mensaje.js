const {Model, DataTypes}=require("sequelize");
const sequelize = require("../lib/sequelize");

class Mensaje extends Model {}

Mensaje.init(
    {
        timestamp:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique: true,
        },
        message:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Mensajes",
        timestamps: false
    }
);

Mensaje.sync();

module.exports = Mensaje;
