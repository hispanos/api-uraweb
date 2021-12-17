const router = require('express').Router();

const apiMercadoPagoRouter = require('./mp.js');
const apiFilesRouter = require('./files.js');

router.get('/', (req, res) => {
    res.send('EXTRA')
})

//EXTRAS
router.use('/mp', apiMercadoPagoRouter);
router.use('/files', apiFilesRouter);

module.exports = router