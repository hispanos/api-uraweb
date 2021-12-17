module.exports = (sequelize, type) => {
    const Menu =  sequelize.define('menu_items', {
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
        icon: {
            type: type.STRING(20)
        },
        path: {
            type: type.STRING(20)
        },
        order: {
            type: type.INTEGER(2)
        }
    })

    return Menu;
}