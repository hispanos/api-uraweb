module.exports = (sequelize, type) => {
    const User = sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING(200),
            allowNull: false
        },
        email: {
            type: type.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: type.STRING(150),
            allowNull: false
        },
        status: {
            type: type.INTEGER(1),
            defaultValue: 1
        }
    }, {});

    User.prototype.toJSON =  function () {
        const values = Object.assign({}, this.get());
        
        delete values.password;
        return values;
    }

    return User;
}