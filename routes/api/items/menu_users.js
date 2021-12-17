const router = require('express').Router();

const { MenuItemsUsers: Article } = require('../../../db.js')

router.get('/', async (req, res) => {
    try {
        let articles = await Article.findAll({
            where: {userId: req.userId}
        });

        if(articles === null || articles.length === 0) {
            res.json({
                data: [],
                message: "No data to display"
            })
        }else {
            res.json({
                data: articles,
                message: "Data listed correctly"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            message: "There was an error processing the request."
        })
    }
})

module.exports = router