module.exports = (sequelize, type) => {
    const UsersCompany =  sequelize.define('users_companies', {
        userId: {
            type: type.INTEGER
        },
        companyId: {
            type: type.INTEGER
        }
    }, {
        timestamps: false
    })

    return UsersCompany;
}