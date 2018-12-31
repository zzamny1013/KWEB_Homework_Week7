const mysql_db = require('../../database/db.config')();
const pool = mysql_db.init();

async function processQuery(query,data) {
    try {
        const conn = await pool.getConnection();
        try {
            const sql = conn.format(query,data);
            const [result] = await conn.query(sql);
            conn.release();
            return result;
        } catch (e) {
            conn.release();
            throw e;
        }
    } catch (e) {
        throw e;
    }
}

//회원가입 기능
const util = require('util');
const crypto = require('crypto');
const randomBytes = util.promisify(crypto.randomBytes);
const pbkdf2 = util.promisify(crypto.pbkdf2);

exports.register = async (req,res) => {
    const {id, password, name, introduce} = req.body;
    if(!id || !password || !name){
        res.send('<script>alert("Incorrect Input");history.back();</script>');
    }else{
        try{
            const salt = await randomBytes(64);
            const pwd = await pbkdf2(password, salt.toString('base64'), 100000, 64, 'sha512');
            const data = [id, name, introduce, pwd.toString('base64'), salt.toString('base64'), new Date()];
            await processQuery('INSERT INTO `users` (username, name, introduce, pwd, pwd_help, register) VALUES (?,?,?,?,?,?)', data);
            res.redirect('/');
        }catch(e){
            res.send('Internal Error');
            throw e;
        }
    }
};

//로그인 기능

exports.login = async (req, res) => {
    const {id, password} = req.body;
    try{
        const db_result = await processQuery('SELECT uid,identity,pwd,pwd_help FROM `users` WHERE username = ?', [id]);
        if(db_result.length > 0){
            const input = await pbkdf2(password, db_result[0].pwd_help, 100000, 64, 'sha512');
            if(input.toString('base64') === db_result[0].pwd){
                req.session.user = {
                    uid: db_result[0].uid,
                    id: id
                };
                res.redirect(`/users/${db_result[0].uid}`);
            }else {
                res.send('Login Fail');
            }
        }else{
            res.send('No ID');
        }
    }catch(e){
        res.send('Internal Error');
        throw e;
    }
};

//로그아웃 기능
exports.logout = async (req, res) => {
    try{
        req.session.destroy();
        res.redirect('/');
    }catch (e) {
        throw e;
    }
}
