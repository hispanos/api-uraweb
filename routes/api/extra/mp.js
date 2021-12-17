const router = require('express').Router();
const config = require('../../../config');

const mercadopago = require ('mercadopago');

mercadopago.configure({
    access_token: config.PROD_ACCESS_TOKEN
});

router.post('/', async (req, res) => {

    try {
        let preference = {
            items: req.body.data.items,
            back_urls: {
                "success": `${config.APP_DOMAIN}/success`,
                "failure": `${config.APP_DOMAIN}/success`,
                "pending": `${config.APP_DOMAIN}/success`
            }
        };
        mercadopago.preferences.create(preference)
    
        .then(function(response){
            global.id = response.body.id;
            res.json({
                idPreference: response.body.id,
                message: "Conectado con éxito"
            })
        }).catch(function(error){
            console.log(error);
        });
    
    } catch (error) {
        res.json({
            message: "Hubo un error al conectar",
            error: error
        })
    }
})

module.exports = router