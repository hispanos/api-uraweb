const router = require('express').Router();

const apiCompaniesRouter = require('./companies.js');
const apiMenuUsers = require('./menu_users');
const {isSuper, isAdmin} = require('../../middlewares/check_rol')

router.get('/', (req, res) => {
    res.send('LIST COLLECTIONS')
})

//ITEMS
router.use('/companies', apiCompaniesRouter);
router.use('/menu_items', apiMenuUsers);

module.exports = router