const sql = require('../db')

const User = function(user) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
}

User.get_all = (result) => {
    sql.query("SELECT * From users", (err, blog) => {
        if (err) {
            result(null)
        } else {
            result(blog)
        }
    })

}

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error :", err)
            result(err, null)
            return;
        }
        console.log("create user : ", { id: res.insertId, ...newUser })
        result(null, { id: res.insertId, ...newUser });
    })
}



User.findByEmail = (email, result) => {
    sql.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result(null, null);
    });
};

// User.verify = (email, result) => {
//     sql.query(
//         "UPDATE infor_account SET email_verified_at = ? WHERE email = ?", [new Date(), email],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }
//             if (res.affectedRows == 0) {
//                 result({ kind: "not_found" }, null);
//                 return;
//             }
//             result(null, { email: email });
//         }
//     );
// }


module.exports = User