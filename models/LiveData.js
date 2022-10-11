module.exports = (sequelize, DataTypes) => {

    const livedata = sequelize.define('livedata', {
        latitude: { type: DataTypes.FLOAT, allowNull:false},
        longitude: { type: DataTypes.FLOAT, allowNull:false},
        temperature: { type: DataTypes.FLOAT, allowNull:false},
        humidity: { type: DataTypes.FLOAT, allowNull:false},
        rain: {type: DataTypes.FLOAT, allowNull:false},
        description: { type: DataTypes.STRING, allowNull:false},
    })

    return livedata

}
