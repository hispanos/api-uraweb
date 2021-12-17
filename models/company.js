module.exports = (sequelize, type) => {
    const Company =  sequelize.define('companies', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING(100),
            allowNull: false,
            length: 100
        },
        phone: {
            type: type.STRING(20)
        }
    })

    return Company;
}