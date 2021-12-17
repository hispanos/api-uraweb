module.exports = (sequelize, type) => {
    const Model =  sequelize.define('users_menu', {
        userId: {
            type: type.INTEGER
        },
        menuItemId: {
            type: type.INTEGER
        }
    }, {
        timestamps: false
    })

    return Model;
}