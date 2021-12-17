const router = require('express').Router();
const config = require('../../../config');
const fs = require('fs');
const path = require("path");
const multer = require("multer");

const publicPath="./public/upload";

let objMulter = multer({ dest: "./public/upload" }); 

router.use(objMulter.any())

router.post('/upload', async (req, res) => {
    try {
        let oldName = req.files[0].path;// Obtener el nombre
        // Agrega el sufijo original al nuevo nombre
        let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
        fs.renameSync(oldName, newName);// Cambiar el nombre de la imagen
        res.json({
            message: "Archivo subido correctamente",
            name: `${req.files[0].filename}${path.parse(req.files[0].originalname).ext}`,
            url: `${config.SERVER_DOMAIN}/api/extra/files/view/${req.files[0].filename}${path.parse(req.files[0].originalname).ext}`
        })
    
    } catch (error) {
        res.json({
            message: "Hubo un error al conectar",
            error: error
        })
    }
})

router.get('/view/:file', async (req, res) => {
    try {
        let fileLoc = path.resolve(publicPath);
        let file = req.params.file
        fileLoc = path.join(fileLoc, file);
        let stream = fs.createReadStream(fileLoc);

        stream.on('error', function(error) {
            res.writeHead(404, 'No se pudo encontrar el archivo');
            res.end();
        });

        stream.pipe(res);
    
    } catch (error) {
        res.json({
            message: "Hubo un error al conectar",
            error: error
        })
    }
})

module.exports = router