module.exports = app => {
    const controller = require('../Controllers/Blog/blog.controller')
    const controllerAcount = require('../Controllers/auth/login.controller')

    var router = require('express').Router();
    var appRoot = require('app-root-path')
    const multer = require('multer')
    const path = require('path')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            // console.log(appRoot)
            cb(null, appRoot + "/Public/upload");
        },

        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        }
    });

    const imageFilter = function(req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    let upload = multer({ storage: storage, fileFilter: imageFilter });

    router.get('/blog/list', controller.list_blog, controllerAcount.list_account)

    .get('/blog/:id', controller.detail_blog)
        .post('/create_blog', upload.single('image_upload'), controller.createBlog)
        .post('/blog/remove/:id', controller.remove_blog)
        .get("/blog/edit/:id", controller.edit_blog)
        .post('/update', upload.single('image_update'), controller.updateBlog)
        .get("/search", controller.search)

    app.use(router);
}