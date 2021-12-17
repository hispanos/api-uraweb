const isSuper = (req, res, next) => {

    if(req.roleId != 1) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    next();
}

const isAdmin = (req, res, next) => {

    if(req.roleId != 2) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    next();
}


module.exports = {
    isAdmin: isAdmin,
    isSuper: isSuper
}