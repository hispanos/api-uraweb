const router = require('express').Router();

const { Company: Article } = require('../../../db.js')

const {isSuper, isAdmin} = require('../../middlewares/check_rol')

router.get('/', isSuper, async (req, res) => {
    console.log(req.userId)
    console.log(req.roleId)
    try {
        let articles = null;
        if (Object.keys(req.query).length === 0) {
            articles = await Article.findAll();
        }else{
            articles = await Article.findAll({
                where: {...req.query}
            });
        }

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

router.get('/:id', async (req, res) => {
    try {
        let article = null
        if (Object.keys(req.query).length === 0) {
            article = await Article.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        association: Article.User,
                    }
                ]
            });
        }else {
            article = await Article.findOne({
                where: { id: req.params.id, ...req.query },
                include: [
                    {
                        association: Article.User,
                    }
                ]
            });
        }
        
        if(article === null || article.length === 0) {
            res.json({
                data: {},
                message: "No data to display"
            })
        }else {
            res.json({
                data: article,
                message: "Data listed correctly"
            })
        }
    } catch (error) {
        res.json({
            message: "There was an error processing the request."
        })
    }
})

router.post('/', isSuper, async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.json({
            data: article,
            message: "Data published correctly"
        })
    } catch (error) {
        res.json({
            message: "There was an error processing the request."
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const article = await Article.update(req.body, {
            where: { id: req.params.id }
        });
        const response = await Article.findOne({
            where: { id: req.params.id }
        });
        res.json({
            data: response,
            message: "Data updated correctly"
        })
    } catch (error) {
        res.json({
            message: "There was an error processing the request."
        })
    }    
})

router.delete('/:id', isSuper, async (req, res) => {
    try {
        await Article.destroy({
            where: { id: req.params.id }
        })
        res.json({
            message: "Data deleted successfully"
        })
    } catch (error) {
        res.json({
            message: "There was an error processing the request."
        })
    }
})

module.exports = router