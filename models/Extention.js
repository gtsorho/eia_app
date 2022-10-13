module.exports = (sequelize, DataTypes) => {

    const extension =  sequelize.define('extension', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull:true,
            empty: true,
            validate:{
                isEmail: true
            }, 
        },
        phone:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[10 , 15]
            }
        },
    })
    return extension
}