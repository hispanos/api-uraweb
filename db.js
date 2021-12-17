const config = require('./config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.DB_DB_NAME, config.DB_USER_NAME, config.DB_PASSWORD, {
    host: config.DB_SERVER,
    dialect: 'mysql'
})

//Models
const User = require('./models/user.js')(sequelize, Sequelize)
const Role = require('./models/role.js')(sequelize, Sequelize)
const Company = require('./models/company.js')(sequelize, Sequelize)
const UsersCompany = require('./models/user_company')(sequelize, Sequelize)
const MenuItems = require('./models/layout/menu')(sequelize, Sequelize)
const MenuItemsUsers = require('./models/layout/menu_users')(sequelize, Sequelize)

User.Role = User.belongsTo(Role)

Company.User = Company.belongsToMany(User, {through: UsersCompany})
User.Company = User.belongsToMany(Company, {through: UsersCompany})
User.Menu = User.belongsToMany(MenuItems, {through: MenuItemsUsers})

sequelize.sync({ force: false }).then(() => { console.log('Tablas sincronizadas') });

module.exports = {
    User,
    Role,
    Company,
    UsersCompany,
    MenuItems,
    MenuItemsUsers
}