module.exports = (sequelize, DataTypes) => {

    const extension =  sequelize.define('extGroups', {
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull:false,
        },
    })
    return extension
}