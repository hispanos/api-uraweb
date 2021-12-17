const router = require('express').Router();

const { Role: Article } = require('../../../db.js')

router.get('/', async (req, res) => {
    try {
        const articles = await Article.findAll();
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
        res.json({
            message: "There was an error processing the request."
        })
    }
})

module.exports = router