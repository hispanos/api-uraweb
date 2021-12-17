const router = require('express').Router();
const {checkToken} = require('./middlewares/token.js')

const apiUsersRouter = require('./api/users.js')
const apiAuthRouter = require('./api/auth/authenticate')
const apiRoleRouter = require('./api/auth/roles.js')

const apiItemsRouter = require('./api/items');
const apiExtraRouter = require('./api/extra')

router.get('/', (req, res) => {
    res.send('API URAWEB')
})

router.use('/auth', apiAuthRouter);
router.use('/users', checkToken, apiUsersRouter);
router.use('/roles', apiRoleRouter);
//ITEMS
router.use('/items', checkToken, apiItemsRouter);

//Extras
router.use('/extra', checkToken, apiExtraRouter)

module.exports = router