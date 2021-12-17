const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const { User: Article, UsersCompany, Company } = require('../../db.js')

router.get('/', async (req, res) => {
    try {
        let articles = null;
        if (Object.keys(req.query).length === 0) {
            articles = await Article.findAll({
                include: [
                    {
                        association: Article.Role
                    },
                    {
                        association: Article.Company
                    }
                    ,
                    {
                        association: Article.Menu
                    }
                ] 
            });
        }else{
            articles = await Article.findAll({
                where: {...req.query},
                include: [
                    {
                        association: Article.Role
                    },
                    {
                        association: Article.Company
                    }
                    ,
                    {
                        association: Article.Menu
                    }
                ] 
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
        res.json({
            message: "There was an error processing the request."
        })
    }
})

router.get('/check', (req, res) => {
    if (!req.userId) {
        return res.status(403).json({
            message: "No authorized."
        })
    }

    res.json({
        message: "There is conecction"
    })

})

router.get('/me', async (req, res) => {
    try {
        let article = null
        article = await Article.findOne({
            where: { id: req.userId, ...req.query },
            include: [
                {
                    association: Article.Role
                },
                {
                    association: Article.Company
                }
                ,
                {
                    association: Article.Menu
                }
            ] 
        });
        
        if(article === null || article.length === 0) {
            res.json({
                data: {},
                message: "No data to display"
            })
        }else {
            res.json({
                data: article,
                company: article.companies[0],
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
                        association: Article.Role
                    },
                    {
                        association: Article.Company
                    }
                    ,
                    {
                        association: Article.Menu
                    }
                ] 
            });
        }else {
            article = await Article.findOne({
                where: { id: req.params.id, ...req.query },
                include: [
                    {
                        association: Article.Role
                    },
                    {
                        association: Article.Company
                    }
                    ,
                    {
                        association: Article.Menu
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

router.post('/register', [
    check('name', 'Email is required').not().isEmpty(),
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
        if (req.body.password != undefined) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const article = await Article.create(req.body, {
            include: [
                {
                    association: Article.Role
                },
                {
                    association: Article.Company
                }
                ,
                {
                    association: Article.Menu
                }
            ] 
        });

        if (req.body.hasOwnProperty('company')) {
            req.body.company.forEach(async (element) => {
                try {
                    const comp = await Company.findByPk(element)
                    const ejj = await UsersCompany.create({
                        userId: article.id,
                        companyId: element
                    })
                } catch (error) {
                    console.log(error)
                }
                
            });
        }
        
        res.json({
            data: article,
            message: "Data published correctly"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "There was an error processing the request.",
            error: error
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

router.delete('/:id', async (req, res) => {
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