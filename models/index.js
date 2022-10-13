const {Sequelize, DataTypes}  = require("sequelize");
const Address = require('./Address')
const DailyWeather = require('./DailyWeather')
const LiveData = require('./LiveData')
const ExtensionOfficer = require('./ExtensionOfficer')
const Extension = require('./Extention')
const ExtGroup = require('./ExtGroup')
const GroupLink = require('./GroupLink')
   
const prod = [   
   'eia_db',
   'root',
   'OzxHZ4eZDBU1LVmV',
   {
      host: 'srv-captain--datalake-db',
      dialect: 'mysql'
   }
]

let dev = [   
   'eia_db',
   'root',
   '',
   {
      host: 'localhost',
      dialect: 'mysql'
   }
]
const sequelize = new Sequelize(
   'eia_db',
   'root',
   'OzxHZ4eZDBU1LVmV',
   {
      host: 'srv-captain--datalake-db',
      dialect: 'mysql'
   }
);


const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize


db.Address = Address(sequelize, DataTypes)
db.LiveData = LiveData(sequelize, DataTypes)
db.ExtGroup = ExtGroup(sequelize, DataTypes)
db.GroupLink = GroupLink(sequelize, DataTypes)
db.Extension = Extension(sequelize, DataTypes)
db.DailyWeather = DailyWeather(sequelize, DataTypes)
db.ExtensionOfficer = ExtensionOfficer(sequelize, DataTypes)

db.ExtensionOfficer.hasMany(db.Extension);
db.Address.hasMany(db.DailyWeather);

db.Address.hasMany(db.Extension);
db.Extension.belongsTo(db.Address)

db.ExtensionOfficer.hasMany(db.ExtGroup);
db.ExtGroup.belongsTo(db.ExtensionOfficer)

db.Extension.hasMany(db.GroupLink)
db.GroupLink.belongsTo(db.Extension)

db.ExtGroup.hasMany(db.GroupLink)
db.GroupLink.belongsTo(db.ExtGroup)

sequelize.sync({ alter: false,  force: false })
.then(()=>{
    console.log('all data in sync')
})


sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = db