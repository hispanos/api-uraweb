const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../../../config.js');

const { User: Article, UsersCompany, Company } = require('../../../db.js')

let company = '';

router.post('/authenticate', [
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email should be Email format').isEmail()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()
        })
    }
    try {
        const user = await Article.findOne({
            where: { email: req.body.email },
            include: [
                {
                    association: Article.Menu,
                }
            ]
        })
        console.log(user)
        if (user) {
            const isEquals = bcrypt.compareSync(req.body.password, user.password);
            if (isEquals) {
                //Consulto el ID de la empresa
                let query = ''
                let infoCompany = ''
                try {
                    query = await UsersCompany.findOne({
                        where: {userId: user.id}
                    })
                    company = query.companyId
                    infoCompany = await Company.findByPk(company)
                } catch (error) {
                    company = 0;
                }
                
                res.json({
                    data: user,
                    company: infoCompany,
                    token: createToken(user),
                    message: "Login correctly"
                })
            }else {
                res.status(403).json({
                    message: "Error",
                    error: "Email or password invalidd"
                })
            }
        }else {
            res.status(403).json({
                message: "Error",
                error: "Email or password invalid"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(403).json({
            message: "There was an error processing the request."
        })
    }
})

const createToken = (user) => {
    const payload = {
        userId: user.id,
        roleId: user.roleId,
        company: company,
        createdAt: moment().unix(),
        expiredAt: moment().add(config.JWT_MINUTES, 'minutes').unix()
    }
    return jwt.encode(payload, config.JWT_SECRET_KEY)
}

module.exports = router;