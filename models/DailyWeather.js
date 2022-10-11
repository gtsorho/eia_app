module.exports = (sequelize, DataTypes) => {

    const dailyweather = sequelize.define('dailyweather', {
        latitude: { type: DataTypes.FLOAT, allowNull:false},
        longitude: { type: DataTypes.FLOAT, allowNull:false},
        date: {type:DataTypes.DATE, allowNull:false},
        current_temperature: { type: DataTypes.FLOAT, allowNull:false},
        current_rain_level: { type: DataTypes.FLOAT, allowNull:false},
        current_chance_rain: {type: DataTypes.STRING, allowNull:false},
        next_temperature: { type: DataTypes.FLOAT, allowNull:false},
        next_rain_level: { type: DataTypes.FLOAT, allowNull:false},
        next_chance_rain: {type: DataTypes.STRING, allowNull:false},
    })

    return dailyweather
}
