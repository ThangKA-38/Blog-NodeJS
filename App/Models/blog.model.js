const sql = require('./db')

const Blog = function(blog) {
    this.content = blog.content
    this.image = blog.image
}

//lấy tất cả bài viết
Blog.get_all = (result) => {
    sql.query("SELECT * From blog", (err, blog) => {
        if (err) {
            result(null)
        } else {
            result(blog)
        }
    })

}

//tìm bài viết bằng id
Blog.findById = (id, result) => {
    sql.query(`SELECT * From blog WHERE id = ${id}`, (err, blog) => {

        if (err) {
            result(err, null)
            return;
        }
        result(blog)
    })

}

Blog.findByT = (data, result) => {
        sql.query(`SELECT * From blog WHERE content = ${data}`, (err, blog) => {

            if (err) {
                result(err, null)
                return;
            }
            result(blog)
        })

    }
    //tạo bài viết
    // Blog.create = (newData, result) => {
    //     sql.query("INSERT INTO blog SET ?", newData, (err, blog) => {
    //         if (err) {
    //             result(err, null)
    //             return;
    //         } else {
    //             result(null, { id: blog.insertId, ...newData })
    //         }
    //     })

// }
Blog.create_Img = (newData, result) => {
    const db = 'INSERT INTO blog (content, image) VALUES (?, ?)';
    sql.query(db, newData, (err, blog) => {
        if (err) {
            console.error("Error inserting data:", err);
            result(err, null)
            return;
        }
        console.log("Data inserted successfully:", blog);
        result(null, blog);
    })
}


//xóa dữ liệu
Blog.remove = (id, result) => {
    sql.query(`DELETE  From blog WHERE id = ${id}`, (err, blog) => {

        if (err) {
            result(err, null)
            return;
        } else {
            result("xóa data Blog có id: " + id + " Thành công!")
        }

    })
}

//cập nhật dữ liệu
Blog.update = (data, result) => {

    sql.query("UPDATE blog SET content=?,image=? WHERE id=?", [data.content, data.image, data.id], (err, res) => {
        if (err) {
            result(err, null)
            return;
        } else {
            result(null, res)
        }
    })
}


module.exports = Blog;