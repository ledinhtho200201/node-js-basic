import pool from "../configs/connectDB"

let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    let check = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', { dataUser: rows, test: 'abc string test' })
}


let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let user = await pool.execute(`SELECT * FROM users where id = ?`, [userId])

    return res.send(JSON.stringify(user[0]))
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    // let firstName = req.body.firstName;
    await pool.execute('INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, address]);

    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

    return res.render('update.ejs', { dataUser: user[0] }); // x <- y
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    await pool.execute('UPDATE users SET firstName = ?, lastName= ?, email = ?, address = ? WHERE id = ?', [firstName, lastName, email, address, id]);

    return res.redirect('/');
}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}