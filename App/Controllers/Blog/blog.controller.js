const model = require('../../Models/blog.model')
const multer = require('multer');


exports.list_blog = (req, res) => {
    model.get_all((data) => {

        return res.render('blog', { dataUser: data });

    })
}

exports.detail_blog = (req, res) => {
    // model.findById(req.params.id, (data)
    model.findById(req.params.id, (data) => {

        return res.render('blog', { dataUser: data });
    })
}

exports.remove_blog = (req, res) => {
    var data = req.params.id;
    model.remove(data, () => {
        res.redirect('/blog/list')
    })
}

exports.edit_blog = (req, res) => {
    let id = req.params.id
    model.findById(id, (data) => {
        return res.render('EditBlog.ejs', { dataUser: data[0] })
    })
}

exports.updateBlog = (req, res) => {
    // var data = req.body;
    var content = req.body.content
    var image = req.file ? req.file.filename : null;
    var id = req.body.id
    var data = { content, image, id }
    model.update(data, (err) => {
        if (err) {
            console.error("Error updating blog:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.redirect('/blog/list');
    });
}


exports.createBlog = (req, res, err) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.file) {
        return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
        return res.send(err);
    }

    var content = req.body.content;
    var image = req.file ? req.file.filename : null;

    model.create_Img([content, image], () => {
        return res.redirect('/blog/list')
    })
}

exports.search = (req, res) => {
    var content = req.query.content;

    model.get_all((data) => {
        var blog = data.filter(function(item) {
            return item.content.toLowerCase().indexOf(content.toLowerCase()) !== -1
        });
        res.render('blog', {
            dataUser: blog
        });
    })

}