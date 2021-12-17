module.exports = (sequelize, type) => {
    return sequelize.define('roles', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: type.STRING(20),
            allowNull: false
        },
        description: {
            type: type.STRING(50)
        }
    }, {
        timestamps: false
    })
}