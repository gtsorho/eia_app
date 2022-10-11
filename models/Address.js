module.exports = (sequelize, DataTypes) => {

    const address = sequelize.define('address', {
        longitude: { type: DataTypes.STRING, allowNull: false},
        latitude: { type: DataTypes.STRING, allowNull: false},
        location: { type: DataTypes.STRING, allowNull: false},
    })

    return address
}
