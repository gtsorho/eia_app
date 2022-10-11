module.exports = (sequelize, DataTypes) => {
    const extOfficer = sequelize.define('extensionsOfficer', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail: true
            }, 
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    })
    return extOfficer
}